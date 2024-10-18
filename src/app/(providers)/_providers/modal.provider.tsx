"use client";

import { useModal } from "@/zustand/modal.store";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const activeModal = useModal((state) => state.activeModal);

  return (
    <>
      {activeModal}
      {children}
    </>
  );
}

export default ModalProvider;
