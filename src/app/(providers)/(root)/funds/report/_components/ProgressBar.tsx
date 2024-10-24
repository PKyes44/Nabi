"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  elementId: string;
}

function ProgressBar({ elementId }: ProgressBarProps) {
  const [translateValue, setTranslateValue] = useState(460);
  const [isShown, setIsShown] = useState(false);
  const [theme, setTheme] = useState(1);

  const onScroll = (e: Event) => {
    const { scrollTop, scrollHeight } = e.target as unknown as {
      scrollTop: number;
      scrollHeight: number;
    };

    const firstSection = scrollHeight / 2 - 30;
    let translateXValue = 0;

    if (firstSection <= scrollTop) {
      translateXValue =
        460 -
        Math.floor(((scrollTop - firstSection) / (firstSection - 695)) * 460) +
        15;
      setTheme(2);
    } else {
      translateXValue = 460 - Math.floor((scrollTop / firstSection) * 460);
      setTheme(1);
    }

    setTranslateValue(translateXValue);
    setIsShown(true);
  };

  useEffect(() => {
    console.log("elementId ", elementId);
    if (!elementId) return;
    const reportElment = document.getElementById(elementId);
    if (!reportElment) return;

    reportElment.addEventListener("scroll", onScroll);

    return () => {
      setIsShown(false);
      reportElment.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    isShown && (
      <div
        className={` w-[460px] h-4 rounded-sm fixed top-16 z-30 overflow-hidden ${
          theme === 1 ? "bg-orange-300" : "bg-sky-300"
        }`}
      >
        <div
          style={{ transform: `translateX(-${translateValue}px)` }}
          className={`h-4 w-[460px] ${
            theme === 1 ? "bg-orange-500" : "bg-sky-500"
          }`}
        />
      </div>
    )
  );
}

export default ProgressBar;
