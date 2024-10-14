import { Tables } from "@/supabase/database.types";
import { create } from "zustand";

interface StoreDetailStore {
  isShowStoreDetailModal: boolean;
  setIsShowStoreDetailModal: (isShow: boolean) => void;
  storeDetailData: Omit<Tables<"storeDatas">, "lng" | "lat"> | null;
  setStoreDetailData: (
    detailData: Omit<Tables<"storeDatas">, "lng" | "lat">
  ) => void;
}

const useStoreDetailStore = create<StoreDetailStore>((set) => ({
  isShowStoreDetailModal: false,
  setIsShowStoreDetailModal: (isShow: boolean) =>
    set({ isShowStoreDetailModal: isShow }),
  storeDetailData: null,
  setStoreDetailData: (detailData) => set({ storeDetailData: detailData }),
}));

export default useStoreDetailStore;
