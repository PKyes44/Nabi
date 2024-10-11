import { create } from "zustand";

interface StoreDetailStore {
  isShowStoreDetailModal: boolean;
  setIsShowStoreDetailModal: (isShow: boolean) => void;
}

const useStoreDetailStore = create<StoreDetailStore>((set) => ({
  isShowStoreDetailModal: false,
  setIsShowStoreDetailModal: (isShow: boolean) =>
    set({ isShowStoreDetailModal: isShow }),
}));

export default useStoreDetailStore;
