"use client";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

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

  return isDesktop ? (
    <Navigation />
  ) : (
    <div className="fixed bottom-0 left-0 h-12 w-screen bg-white flex justify-center">
      <Navigation />
    </div>
  );
}

export default HeaderNavigation;
