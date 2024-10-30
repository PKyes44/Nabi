"use client";

import { ToastType } from "@/types/toast.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useToastStore } from "@/zustand/toast.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function FundLayout({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.currentUser);
  const addToast = useToastStore((state) => state.addToast);
  const router = useRouter();
  if (user?.role !== "sponsor") {
    const toast: ToastType = {
      id: crypto.randomUUID(),
      title: "권한 부족",
      content: "후원자만 이용 가능한 서비스입니다",
      type: "fail",
    };
    addToast(toast);
    router.replace("/");
  }

  return children;
}

export default FundLayout;
