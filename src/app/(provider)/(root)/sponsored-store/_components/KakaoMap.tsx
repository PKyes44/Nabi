"use client";

import clientApi from "@/api/clientSide/api";
import { Database } from "@/supabase/database.types";
import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { useQuery } from "@tanstack/react-query";
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

  const { data: storeDatas } = useQuery({
    queryKey: ["storeData"],
    queryFn: () => clientApi.storeData.getStoreDatas(),
  });

  useEffect(() => {
    if (!storeDatas) return;

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

    window.kakao.maps.event.addListener(marker, "click", () => {
      const detailData: Database["public"]["Tables"]["storeDatas"]["Row"] = {
        storeId: "ed540cfb-78c3-4821-80af-1796ab6d349d",
        address: " 강남구  청담1동 76-4  지하1층",
        phoneNumber: "0234434402",
        storeType: "한식",
        brandName: "청숫골보리밥쌈밥",
        lat: "37.5193631879583",
        lng: "127.050329397246",
        createdAt: "",
      };
      setStoreDetailData(detailData);
      setIsShowStoreDetailModal(true);
    });
  }, [location, storeDatas]);

  // if (!location.loaded) return <span>데이터 로딩중 ..</span>;

  return <div id="map" className="w-screen h-screen" />;
}

export default KakaoMap;
