"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import { Tables } from "@/supabase/database.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LinkToStoreMapButtonProps {
  store: Tables<"storeDatas">;
}

function LinkToStoreMapButton({ store }: LinkToStoreMapButtonProps) {
  const { brandName, lat, lng } = store;
  const router = useRouter();
  const windowSize = useWindowSize();
  const [buttonSize, setButtonSize] = useState<"sm" | "xs">(
    windowSize.width <= 360 ? "xs" : "sm"
  );

  const handleClickLinkToStoreMap = () => {
    router.push(`/free-meals/map?lat=${lat}&lng=${lng}&brandName=${brandName}`);
  };

  useEffect(() => {
    if (!windowSize) return;
    if (windowSize.width <= 360) setButtonSize("xs");
    else setButtonSize("sm");
  }, [windowSize]);

  return (
    <ButtonGroup
      value="위치 보기"
      intent="primary"
      textIntent="primary"
      wrapperClassName="grow sm:grow-0"
      className="whitespace-nowrap w-full sm:w-auto"
      size={buttonSize}
      onClick={handleClickLinkToStoreMap}
    />
  );
}

export default LinkToStoreMapButton;
