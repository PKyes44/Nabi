/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Loading from "@/components/Loading/Loading";
import { useAuthStore } from "@/zustand/auth.store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

function LoggedInOnlyLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  if (!isAuthInitialized) return <Loading />;

  if (!isLoggedIn) router.replace("/log-in");

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

export default LoggedInOnlyLayout;
