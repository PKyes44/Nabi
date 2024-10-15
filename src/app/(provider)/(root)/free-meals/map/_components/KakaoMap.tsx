/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
}

function KakaoMap({ lat = 33.450701, lng = 126.570667 }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useGeolocation();
  const router = useRouter();
  const [storeDatas, setStoreDatas] = useState<Tables<"storeDatas">[]>([]);
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer | null>(
    null
  );
  const setIsShowStoreDetailModal = useStoreDetailStore(
    (state) => state.setIsShowStoreDetailModal
  );
  const setStoreDetailData = useStoreDetailStore(
    (state) => state.setStoreDetailData
  );

  const paintMarkers = async (map: {
    getLevel: () => any;
    getBounds: () => any;
  }) => {
    // 지도 영역정보를 얻어옵니다
    const bounds = map.getBounds();

    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const requestData = {
      swLatLng,
      neLatLng,
    };
    const storeDataList =
      await clientApi.storeData.getStoreDatasBySwLatLngAndNeLatLng(requestData);
    setStoreDatas(storeDataList);
  };

  useEffect(() => {
    if (!window.kakao) {
      alert("지도를 찾을 수 없습니다");
      return router.replace("/");
    }
    window.kakao.maps.load(() => {
      const center = !isNaN(lat)
        ? new window.kakao.maps.LatLng(lat, lng)
        : !location.error && location.loaded
        ? new window.kakao.maps.LatLng(
            location.coordinates!.lat,
            location.coordinates!.lng
          )
        : new window.kakao.maps.LatLng(33.450701, 126.570667);
      console.log("center: ", center);
      const options = {
        center, // 지도 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        markers: [],
        gridSize: 50,
        averageCenter: true,
        minLevel: 3,
        disableClickZoom: true,
      });
      setClusterer(clusterer);
      paintMarkers(map);

      window.kakao.maps.event.addListener(map, "bounds_changed", function () {
        paintMarkers(map);
      });
    });
  }, [location]);

  useEffect(() => {
    if (!clusterer || !storeDatas || storeDatas.length === 0) return;

    clusterer.clear();
    storeDatas.forEach((data) => {
      const markerPosition = new window.kakao.maps.LatLng(data.lat, data.lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      clusterer.addMarker(marker, false);

      window.kakao.maps.event.addListener(marker, "click", () => {
        const detailData: Omit<Tables<"storeDatas">, "lng" | "lat"> = {
          storeId: data.storeId,
          address: data.address,
          phoneNumber: data.phoneNumber,
          storeType: data.storeType,
          brandName: data.brandName,
          createdAt: data.createdAt,
        };
        setStoreDetailData(detailData);
        setIsShowStoreDetailModal(true);
      });
    });
  }, [storeDatas]);

  return <div ref={mapRef} className="w-screen h-screen" />;
}

export default KakaoMap;
