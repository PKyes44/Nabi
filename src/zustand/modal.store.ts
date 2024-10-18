import { create } from "zustand";

interface ModalStore {
  activeModal: JSX.Element | null;
  setActiveModal: (activeModal: JSX.Element | null) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  setActiveModal: (activeModal: JSX.Element | null) => set({ activeModal }),
}));
