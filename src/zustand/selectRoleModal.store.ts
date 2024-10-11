import { create } from "zustand";

interface SelectRoleModalStore {
  isShowSelectRoleModal: boolean;
  setIsShowSelectRoleModal: (isShow: boolean) => void;
  authType: "log-in" | "sign-up" | null;
  setAuthType: (authType: "log-in" | "sign-up") => void;
}

const useSelectRoleModalStore = create<SelectRoleModalStore>((set) => ({
  isShowSelectRoleModal: false,
  setIsShowSelectRoleModal: (isShow: boolean) =>
    set({ isShowSelectRoleModal: isShow }),
  authType: null,
  setAuthType: (authType: "log-in" | "sign-up") => set({ authType }),
}));
export default useSelectRoleModalStore;
