import { Database } from "@/supabase/database.types";
import { create } from "zustand";

interface StoreDetailStore {
  isShowStoreDetailModal: boolean;
  setIsShowStoreDetailModal: (isShow: boolean) => void;
  storeDetailData: Database["public"]["Tables"]["storeDatas"]["Row"] | null;
  setStoreDetailData: (
    detailData: Database["public"]["Tables"]["storeDatas"]["Row"]
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
