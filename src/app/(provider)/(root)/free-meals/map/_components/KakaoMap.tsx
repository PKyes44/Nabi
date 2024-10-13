"use client";

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { useEffect } from "react";
import useGeolocation from "./useGeolocation";

declare global {
  interface Window {
    kakao: any;
  }
}

type InitialDataKey = {
  연번: string;
  업종: string;
  가맹점명칭: string;
  주소1: string;
  전화번호: string;
};

const initialDataKey: InitialDataKey = {
  연번: "storeId",
  업종: "industry",
  가맹점명칭: "storeName",
  주소1: "address",
  전화번호: "phoneNumber",
};

type DataObject = {
  storeId: string;
  industry: string;
  storeName: string;
  address: string;
  phoneNumber: string;
};

function KakaoMap() {
  const location = useGeolocation();
  const setIsShowStoreDetailModal = useStoreDetailStore(
    (state) => state.setIsShowStoreDetailModal
  );
  const setStoreDetailData = useStoreDetailStore(
    (state) => state.setStoreDetailData
  );

  useEffect(() => {
    let container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const center = location.loaded
      ? new window.kakao.maps.LatLng(
          location.coordinates!.lat,
          location.coordinates!.lng
        )
      : new window.kakao.maps.LatLng(33.450701, 126.570667);
    let options = {
      center, // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options);

    // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    window.kakao.maps.event.addListener(
      map,
      "bounds_changed",
      async function () {
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
          await clientApi.storeData.getStoreDatasBySwLatLngAndNeLatLng(
            requestData
          );

        storeDatas.forEach((data) => {
          const markerPosition = new window.kakao.maps.LatLng(
            data.lat,
            data.lng
          );

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
      }
    );
  }, [location]);

  return <div id="map" className="w-screen h-screen" />;
}

export default KakaoMap;
