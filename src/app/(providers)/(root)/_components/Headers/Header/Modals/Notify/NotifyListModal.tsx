import Modal from "@/components/Modal/Modal";
import { useModalStore } from "@/zustand/modal.store";
import { PropsWithChildren } from "react";
import NotifyList from "./NotifyList";

function NotifyListModal({ children }: PropsWithChildren) {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <>
      {activeModal && (
        <Modal isDim={false}>
          <NotifyList />
        </Modal>
      )}
      {children}
    </>
  );
}

export default NotifyListModal;
