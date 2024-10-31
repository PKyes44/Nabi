"use client";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

function HeaderNavigation() {
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    if (windowSize.width <= 360) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  return isMobile ? (
    <Navigation />
  ) : (
    <div className="fixed bottom-0 left-0 h-12 w-screen bg-white flex justify-center">
      <Navigation />
    </div>
  );
}

export default HeaderNavigation;
