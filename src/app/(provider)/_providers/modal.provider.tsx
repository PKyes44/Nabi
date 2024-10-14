"use client";

import ProfileEditModal from "@/components/Modal/ProfileEditModal";
import SelectRoleModal from "@/components/Modal/SelectRoleModal";
import StoreDetailModal from "@/components/Modal/StoreDetailModal";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  return (
    <SelectRoleModal>
      <StoreDetailModal>
        <ProfileEditModal>{children}</ProfileEditModal>
      </StoreDetailModal>
    </SelectRoleModal>
  );
}

export default ModalProvider;
