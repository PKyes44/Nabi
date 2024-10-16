"use client";

import LogOutModal from "@/components/Modal/LogOutModal";
import ProfileEditModal from "@/components/Modal/ProfileEditModal";
import SelectRoleModal from "@/components/Modal/SelectRoleModal";
import StoreDetailModal from "@/components/Modal/StoreDetailModal";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  return (
    <SelectRoleModal>
      <StoreDetailModal>
        <ProfileEditModal>
          <LogOutModal>{children}</LogOutModal>
        </ProfileEditModal>
      </StoreDetailModal>
    </SelectRoleModal>
  );
}

export default ModalProvider;
