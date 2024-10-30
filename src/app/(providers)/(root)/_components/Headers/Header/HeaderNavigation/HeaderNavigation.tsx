"use client";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import { useEffect, useState } from "react";
import HeaderNavigationLink from "./HeaderNavigationLink";

function HeaderNavigation() {
  const windowSize = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    if (windowSize.width <= 1024) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  }, [windowSize]);

  if (!isDesktop) return null;
  return (
    <nav className="flex items-center gap-x-5">
      <HeaderNavigationLink href="/funds" label="후원기금 모금하기" />
      <HeaderNavigationLink href="/funds/report" label="후원 리포트" />
      <HeaderNavigationLink href="/free-meals/map" label="아동급식카드 지도" />
    </nav>
  );
}

export default HeaderNavigation;
