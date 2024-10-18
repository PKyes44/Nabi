"use client";

import { useModalStore } from "@/zustand/modal.store";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal}
      {children}
    </>
  );
}

export default ModalProvider;
