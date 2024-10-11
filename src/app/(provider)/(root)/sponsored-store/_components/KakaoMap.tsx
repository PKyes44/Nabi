"use client";

import clientApi from "@/api/clientSide/api";
import { Database } from "@/supabase/database.types";
import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useGeolocation from "./useGeolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  const location = useGeolocation();
  const setIsShowStoreDetailModal = useStoreDetailStore(
    (state) => state.setIsShowStoreDetailModal
  );

  const { data: storeDatas } = useQuery({
    queryKey: ["storeData"],
    queryFn: () => clientApi.storeData.getStoreDatas(),
  });
  const { mutate: updateStore } = useMutation({
    mutationFn: (
      updateStoreData: Database["public"]["Tables"]["storeData"]["Row"]
    ) => clientApi.storeData.updateStoreData(updateStoreData),
    onSuccess: (...arg) => {
      console.log("success:", arg);
    },
  });

  useEffect(() => {
    let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
    const center = location.loaded
      ? new window.kakao.maps.LatLng(
          location.coordinates!.lat,
          location.coordinates!.lng
        )
      : new window.kakao.maps.LatLng(33.450701, 126.570667);
    console.log(center, location);
    let options = {
      center, // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(
      location.coordinates!.lat,
      location.coordinates!.lng
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    window.kakao.maps.event.addListener(marker, "click", () =>
      setIsShowStoreDetailModal(true)
    );
  }, [location]);

  useEffect(() => {
    if (!storeDatas) return;

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new window.kakao.maps.services.Geocoder();

    console.log(storeDatas.length);
    // 주소로 좌표를 검색합니다
    storeDatas.forEach((data, index) => {
      // geocoder.addressSearch(data.address, function (result, status) {
      //   // 정상적으로 검색이 완료됐으면
      //   if (status === window.kakao.maps.services.Status.OK) {
      //     const lat = result[0].y;
      //     const lng = result[0].x;
      //     const updateStoreData = {
      //       ...data,
      //       lat,
      //       lng,
      //     };
      //     updateStore(updateStoreData);
      //   }
      // });
    });
  }, [storeDatas]);

  // if (!location.loaded) return <span>데이터 로딩중 ..</span>;

  return <div id="map" className="w-screen h-screen" />;
}

export default KakaoMap;
