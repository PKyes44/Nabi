import useModalStore from "@/zustand/modal.store";
import { ComponentProps, PropsWithChildren } from "react";

interface ModalProps {
  className?: string;
}

function Modal({ className, children }: PropsWithChildren<ModalProps>) {
  const setIsShowSelectRoleModal = useModalStore(
    (state) => state.setIsShowSelectRoleModal
  );

  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowSelectRoleModal(false);
    }
  };

  return (
    <div
      className={`${className} w-screen h-screen absolute z-50 top-0 left-0 bg-black bg-opacity-45`}
      onClick={handleClickOutOfRange}
    >
      {children}
    </div>
  );
}

export default Modal;
