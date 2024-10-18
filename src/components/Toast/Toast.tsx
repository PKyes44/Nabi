import { ToastType } from "@/types/toast.types";
import { useToastStore } from "@/zustand/toast.store";
import { useEffect, useState } from "react";

interface ToastProps {
  toast: ToastType;
  showTime: number;
  duration: number;
}

function Toast({ toast, duration, showTime }: ToastProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted)
      setTimeout(() => {
        setIsShown(true);
      }, 30);
  }, [isMounted]);

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        setIsShown(false);
      }, showTime);
    }
  }, [isShown]);

  useEffect(() => {
    if (!isShown && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, duration);

      setTimeout(() => {
        removeToast(toast.id!);
      }, duration + 30);
    }
  }, [isShown]);

  return (
    <>
      {isMounted && (
        <div
          className={` p-5 flex flex-col items-start justify-start gap-y-1 w-96 h-28 bg-white shadow-xl rounded-lg transition-all duration-300 translate-x-[430px] ${
            isShown && "!translate-x-0"
          }`}
        >
          <h6 className="font-bold">{toast.title}</h6>
          <p className="text-base">{toast.content}</p>
        </div>
      )}
    </>
  );
}

export default Toast;
