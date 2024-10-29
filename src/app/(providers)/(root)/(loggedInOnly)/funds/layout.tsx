"use client";

import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function FundLayout({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.currentUser);
  const router = useRouter();
  if (user?.role !== "sponsor") {
    alert("후원하기 페이지는 후원자만 이용 가능합니다.");
    router.replace("/");
  }

  return children;
}

export default FundLayout;
