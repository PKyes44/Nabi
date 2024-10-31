"use client";
import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function RecruitsLayout({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.currentUser);
  const router = useRouter();
  if (user?.role !== "sponsor") router.replace("/");

  return children;
}

export default RecruitsLayout;
