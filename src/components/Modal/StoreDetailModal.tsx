import useStoreDetailStore from "@/zustand/modals/storeDetailModal.store";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";
import StoreDetails from "./components/StoreDetails";

function StoreDetailModal({ children }: PropsWithChildren) {
  const isShowStoreDetailModal = useStoreDetailStore(
    (state) => state.isShowStoreDetailModal
  );
  const setIsShowStoreDetailModal = useStoreDetailStore(
    (state) => state.setIsShowStoreDetailModal
  );

  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowStoreDetailModal(false);
    }
  };

  return (
    <>
      {isShowStoreDetailModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="grid place-content-center w-auto"
        >
          <StoreDetails />
        </Modal>
      )}
      {children}
    </>
  );
}

export default StoreDetailModal;
