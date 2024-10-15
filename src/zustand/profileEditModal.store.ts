import { create } from "zustand";

type ProfileEditModalStore = {
  isShowProfileEditModal: boolean,
  setIsShowProfileEditModal: (isShowProfileEditModal: boolean) => void,
};

export const useProfileEditModalStore = create<ProfileEditModalStore>((set) => ({
    isShowProfileEditModal: false,
    setIsShowProfileEditModal: (isShowProfileEditModal) => set({ isShowProfileEditModal }),
}));