"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import { Tables } from "@/supabase/database.types";
import { useRouter } from "next/navigation";

interface LinkToStoreMapButtonProps {
  store: Tables<"storeDatas">;
}

function LinkToStoreMapButton({ store }: LinkToStoreMapButtonProps) {
  const { brandName, lat, lng } = store;
  const router = useRouter();
  const handleClickLinkToStoreMap = () => {
    router.push(`/free-meals/map?lat=${lat}&lng=${lng}&brandName=${brandName}`);
  };

  return (
    <ButtonGroup
      value="위치 보기"
      intent="primary"
      textIntent="primary"
      className="w-full"
      size="sm"
      onClick={handleClickLinkToStoreMap}
    />
  );
}

export default LinkToStoreMapButton;
