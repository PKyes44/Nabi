/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useModal } from "@/zustand/modal.store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import StoreDetailModal from "./StoreDetailModal";
import useGeolocation from "./useGeolocation";

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
  }
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  brandName: string;
}

function KakaoMap({
  lat = 33.450701,
  lng = 126.570667,
  brandName,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useGeolocation();
  const router = useRouter();
  const [storeDatas, setStoreDatas] = useState<Tables<"storeDatas">[]>([]);
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer | null>(
    null
  );
  const setActiveModal = useModal((state) => state.setActiveModal);

  const getStoreDatas = async (map: {
    getLevel: () => any;
    getBounds: () => any;
  }) => {
    const bounds = map.getBounds();

    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    if (isNaN(swLatLng.La) || isNaN(swLatLng.Ma))
      return console.log("map is undefined");
    if (isNaN(neLatLng.La) || isNaN(neLatLng.Ma)) return;

    const requestData = {
      swLatLng,
      neLatLng,
    };
    const storeDataList =
      await clientApi.storeData.getStoreDatasBySwLatLngAndNeLatLng(requestData);
    setStoreDatas(storeDataList);
  };

  const createMarker = (
    storeData: Tables<"storeDatas">,
    clusterer: kakao.maps.MarkerClusterer
  ) => {
    const markerPosition = new window.kakao.maps.LatLng(
      storeData.lat,
      storeData.lng
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    clusterer.addMarker(marker, false);

    window.kakao.maps.event.addListener(marker, "click", () => {
      setActiveModal(<StoreDetailModal detailData={storeData} />);
    });
  };

  useEffect(() => {
    if (!window.kakao) {
      alert("지도를 찾을 수 없습니다");
      return router.replace("/");
    }

    window.kakao.maps.load(() => {
      console.log("loaded kakao map");
      let mapLevel = 2;

      let mapCenter =
        !location.error && location.loaded
          ? {
              lat: location.coordinates!.lat,
              lng: location.coordinates!.lng,
            }
          : { lat: 33.450701, lng: 126.570667 };

      const selectedStoreOnHome = !isNaN(lat) && !isNaN(lng);
      if (selectedStoreOnHome) {
        mapLevel = 0;
        mapCenter = { lat, lng };
      }

      const center = new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng);

      const options = {
        center,
        level: mapLevel,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      const clusterer = new kakao.maps.MarkerClusterer({
        map,
        markers: [],
        gridSize: 100,
        averageCenter: true,
        minLevel: 3,
        disableClickZoom: true,
      });
      setClusterer(clusterer);
      getStoreDatas(map);

      window.kakao.maps.event.addListener(map, "bounds_changed", function () {
        router.push("/free-meals/map");
        getStoreDatas(map);
      });
    });
  }, [location]);

  useEffect(() => {
    if (!clusterer || !storeDatas || storeDatas.length === 0) return;

    const selectedStoreOnHome = !isNaN(lat) && !isNaN(lng);
    if (selectedStoreOnHome) {
      const selectedStore = storeDatas.find(
        (store) =>
          store.lat === lat &&
          store.lng === lng &&
          store.brandName === brandName
      );
      if (!selectedStore) return;

      createMarker(selectedStore, clusterer);
      return setActiveModal(<StoreDetailModal detailData={selectedStore} />);
    }

    clusterer.clear();
    storeDatas.forEach((data) => {
      createMarker(data, clusterer);
    });
  }, [storeDatas]);

  return <div ref={mapRef} className="w-screen h-screen" />;
}

export default KakaoMap;
