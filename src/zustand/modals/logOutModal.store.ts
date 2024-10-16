import { create } from "zustand";

interface LogOutModalStore {
  isShowLogOutModal: boolean;
  setIsShowLogOutModal: (isShowLogOutModal: boolean) => void;
}

export const useLogOutModal = create<LogOutModalStore>((set) => ({
  isShowLogOutModal: false,
  setIsShowLogOutModal: (isShowLogOutModal: boolean) =>
    set({ isShowLogOutModal }),
}));
