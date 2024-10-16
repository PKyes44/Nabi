"use client";

import LogOutModal from "@/components/Modal/LogOutModal";
import ProfileEditModal from "@/components/Modal/ProfileEditModal";
import RegularSponsorshipModal from "@/components/Modal/RegularSponsorshipModal";
import SelectRoleModal from "@/components/Modal/SelectRoleModal";
import StoreDetailModal from "@/components/Modal/StoreDetailModal";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  return (
    <SelectRoleModal>
      <StoreDetailModal>
        <ProfileEditModal>
          <RegularSponsorshipModal>
     
          <LogOutModal>{children}</LogOutModal>
          </RegularSponsorshipModal>
        </ProfileEditModal>
      </StoreDetailModal>
    </SelectRoleModal>
  );
}

export default ModalProvider;
