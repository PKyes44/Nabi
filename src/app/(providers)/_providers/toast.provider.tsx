"use client";

import ToastList from "@/components/Toast/ToastList";
import { PropsWithChildren } from "react";

function ToastProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ToastList />
      {children}
    </>
  );
}

export default ToastProvider;
