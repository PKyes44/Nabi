/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { useEffect, useRef } from "react";
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
  const setIsShowStoreDetailModal = useStoreDetailStore(
    (state) => state.setIsShowStoreDetailModal
  );
  const setStoreDetailData = useStoreDetailStore(
    (state) => state.setStoreDetailData
  );

  useEffect(() => {
    window.kakao.maps.load(() => {
      const center =
        lat !== 33.450701
          ? new window.kakao.maps.LatLng(lat, lng)
          : location.loaded
          ? new window.kakao.maps.LatLng(
              location.coordinates!.lat,
              location.coordinates!.lng
            )
          : new window.kakao.maps.LatLng(lat, lng);
      const options = {
        center, // 지도 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);

      paintMarkers(map);

      // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      window.kakao.maps.event.addListener(map, "bounds_changed", function () {
        paintMarkers(map);
      });
    });
  }, [location]);

  const paintMarkers = async (map: {
    getLevel: () => number;
    getBounds: () => any;
  }) => {
    const level = map.getLevel();
    if (level > 3) return;

    // 지도 영역정보를 얻어옵니다
    const bounds = map.getBounds();

    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const requestData = {
      swLatLng,
      neLatLng,
    };

    const storeDatas =
      await clientApi.storeData.getStoreDatasBySwLatLngAndNeLatLng(requestData);

    storeDatas.forEach((data) => {
      const markerPosition = new window.kakao.maps.LatLng(data.lat, data.lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

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
  };

  return <div ref={mapRef} className="w-screen h-screen" />;
}

export default KakaoMap;
