import { ToastType } from "@/types/toast.types";
import { create } from "zustand";

interface ToastStore {
  toastList: ToastType[];
  addToast: (toast: ToastType) => void;
  removeToast: (removeToastId: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toastList: [],
  addToast: (toast: ToastType) =>
    set((state) => ({ toastList: [...state.toastList, toast] })),
  removeToast: (removeToastId: string) => {
    set((state) => {
      const removedToastList = state.toastList.filter(
        (toast) => toast.id !== removeToastId
      );
      return { toastList: removedToastList };
    });
  },
}));
