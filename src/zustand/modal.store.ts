import { create } from "zustand";

interface ModalStore {
  isShowSelectRoleModal: boolean;
  setIsShowSelectRoleModal: (isShow: boolean) => void;
  authType: "log-in" | "sign-up" | null;
  setAuthType: (authType: "log-in" | "sign-up") => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isShowSelectRoleModal: false,
  setIsShowSelectRoleModal: (isShow: boolean) =>
    set({ isShowSelectRoleModal: isShow }),
  authType: null,
  setAuthType: (authType: "log-in" | "sign-up") => set({ authType }),
}));
export default useModalStore;
