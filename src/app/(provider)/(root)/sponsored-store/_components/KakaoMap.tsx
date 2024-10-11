"use client";

import { useEffect } from "react";
import useGeolocation from "./useGeolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap() {
  const location = useGeolocation();

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

    new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, [location]);

  return <div id="map" className="w-screen h-screen" />;
}

export default KakaoMap;
