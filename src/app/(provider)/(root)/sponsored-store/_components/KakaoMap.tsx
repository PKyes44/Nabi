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

    const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      "제주특별자치도 제주시 첨단로 242",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">지점</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );
  }, [location]);

  // if (!location.loaded) return <span>데이터 로딩중 ..</span>;

  return <div id="map" className="w-screen h-screen" />;
}

export default KakaoMap;
