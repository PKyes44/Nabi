import useStoreDetailStore from "@/zustand/storeDetailModal.store";
import { ComponentProps, PropsWithChildren } from "react";
import Modal from "./Modal";

function StoreDetailModal({ children }: PropsWithChildren) {
  const { isShowStoreDetailModal, setIsShowStoreDetailModal } =
    useStoreDetailStore();

  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    console.log(e.target, e.currentTarget);
    if (e.target === e.currentTarget) {
      setIsShowStoreDetailModal(false);
    }
  };

  return (
    <>
      {isShowStoreDetailModal && (
        <Modal
          onClickFn={handleClickOutOfRange}
          className="grid place-content-center"
        >
          <section className="w-96 h-96 bg-white rounded-lg">매장</section>
        </Modal>
      )}
      {children}
    </>
  );
}

export default StoreDetailModal;
