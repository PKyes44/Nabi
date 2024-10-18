import { Notify } from "@/types/notify.types";
import { create } from "zustand";

interface NotifyStore {
  isCheckedNotifyList: boolean;
  setIsCheckedNotifyList: (isCheckedNotifyList: boolean) => void;
  notifyList: Notify[];
  addNotify: (notifiation: Notify) => void;
  resetNotifyList: () => void;
}

export const useNotifyStore = create<NotifyStore>((set) => ({
  isCheckedNotifyList: true,
  setIsCheckedNotifyList: (isCheckedNotifyList: boolean) =>
    set({ isCheckedNotifyList }),
  notifyList: [],
  addNotify: (notify: Notify) =>
    set((state) => ({
      notifyList: [...state.notifyList, notify],
    })),
  resetNotifyList: () => set({ notifyList: [] }),
}));
