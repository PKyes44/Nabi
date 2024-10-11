"use client";

import SelectRoleModal from "@/components/Modal/SelectRoleModal";
import StoreDetailModal from "@/components/Modal/StoreDetailModal";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  return (
    <SelectRoleModal>
      <StoreDetailModal>{children}</StoreDetailModal>
    </SelectRoleModal>
  );
}

export default ModalProvider;
