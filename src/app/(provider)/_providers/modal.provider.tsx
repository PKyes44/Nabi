"use client";

import SelectRoleModal from "@/components/Modal/SelectRoleModal";
import { PropsWithChildren } from "react";

function ModalProvider({ children }: PropsWithChildren) {
  return <SelectRoleModal>{children}</SelectRoleModal>;
}

export default ModalProvider;
