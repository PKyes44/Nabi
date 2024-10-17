"use client";

import { useModal } from "@/zustand/modal.store";
import { PropsWithChildren, useEffect } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  const activeModal = useModal((state) => state.activeModal);

  useEffect(() => {
    console.log(activeModal);
  }, [activeModal]);

  return (
    <>
      {activeModal}
      {children}
    </>
  );
}

export default ModalProvider;
