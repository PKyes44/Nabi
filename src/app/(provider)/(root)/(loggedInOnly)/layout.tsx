"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Page from "@/components/Page/Page";
import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

function LoggedInOnlyLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  if (!isAuthInitialized) return <Page>페이지를 로딩하는 중 ...</Page>;

  if (!isLoggedIn) router.replace("/auth");

  return children;
}

export default LoggedInOnlyLayout;
