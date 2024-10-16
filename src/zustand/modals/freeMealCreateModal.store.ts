import { create } from "zustand";

type freeMealCreateModalStore = {
  isShowFreeMealCreateModal: boolean;
  setIsFreeMealCreateModal: (isShowFreeMealCreateModal: boolean) => void;
};

export const useFreeMealCreateModalStore = create<freeMealCreateModalStore>(
  (set) => ({
    isShowFreeMealCreateModal: false,
    setIsFreeMealCreateModal: (isShowFreeMealCreateModal) =>
      set({ isShowFreeMealCreateModal }),
  })
);
