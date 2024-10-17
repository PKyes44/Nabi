"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import { Tables } from "@/supabase/database.types";
import { useRouter } from "next/navigation";

interface LinkToStoreMapButtonProps {
  storeDatas: Tables<"storeDatas">;
}

function LinkToStoreMapButton({ storeDatas }: LinkToStoreMapButtonProps) {
  const router = useRouter();
  const handleClickLinkToStoreMap = (lat: number, lng: number) => {
    router.push(`/free-meals/map?lat=${lat}&lng=${lng}`);
  };
  return (
    <ButtonGroup
      value="위치 보기"
      intent="primary"
      textIntent="primary"
      className="w-full"
      onClick={() =>
        handleClickLinkToStoreMap(storeDatas.lat!, storeDatas.lng!)
      }
    />
  );
}

export default LinkToStoreMapButton;
