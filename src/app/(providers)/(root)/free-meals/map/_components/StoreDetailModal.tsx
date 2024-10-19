import StoreDetails from "@/app/(providers)/(root)/free-meals/map/_components/StoreDetails";
import Modal from "@/components/Modal/Modal";
import { Tables } from "@/supabase/database.types";
import { useModalStore } from "@/zustand/modal.store";

interface StoreDetailModalProps {
  detailData: Tables<"storeDatas"> & {
    isRegisted: boolean;
  };
}

function StoreDetailModal({ detailData }: StoreDetailModalProps) {
  const activeModal = useModalStore((state) => state.activeModal);
  return (
    <>
      {activeModal && (
        <Modal className="grid place-content-center w-auto">
          <StoreDetails detailData={detailData} />
        </Modal>
      )}
    </>
  );
}

export default StoreDetailModal;
