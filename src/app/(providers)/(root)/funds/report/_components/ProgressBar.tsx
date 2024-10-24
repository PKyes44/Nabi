"use client";

interface ProgressBarProps {
  isShown: boolean;
  theme: number;
  translateXValue: number;
}

function ProgressBar({ isShown, theme, translateXValue }: ProgressBarProps) {
  return (
    isShown && (
      <div
        className={` w-[460px] h-4 rounded-sm fixed top-16 z-30 overflow-hidden ${
          theme === 1 ? "bg-orange-300" : "bg-sky-300"
        }`}
      >
        <div
          style={{ transform: `translateX(-${translateXValue}px)` }}
          className={`h-4 w-[460px] ${
            theme === 1 ? "bg-orange-500" : "bg-sky-500"
          }`}
        />
      </div>
    )
  );
}

export default ProgressBar;
