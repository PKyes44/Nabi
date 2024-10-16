import { create } from "zustand";

type RegularSponsorShipModal = {
  isShowRegularSponsorShipModal: boolean;
  setIsRegularSponsorShipModal: (isShowProfileEditModal: boolean) => void;
};

export const useRegularSponsorShipModalStore = create<RegularSponsorShipModal>(
  (set) => ({
    isShowRegularSponsorShipModal: false,
    setIsRegularSponsorShipModal: (isShowProfileEditModal) =>
      set({ isShowRegularSponsorShipModal: isShowProfileEditModal }),
  })
);
