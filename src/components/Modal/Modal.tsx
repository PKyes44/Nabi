import { useModalStore } from "@/zustand/modal.store";
import { useNotifyStore } from "@/zustand/notify.store";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

const modalVariant = cva("w-screen h-screen absolute top-0 left-0 z-10 ", {
  variants: {
    isDim: {
      true: "bg-black bg-opacity-45",
      false: "bg-transparent",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    isDim: true,
  },
});

type ModalVariant = VariantProps<typeof modalVariant>;

type PassedModalProps = {
  className?: string;
};

type ModalProps = PassedModalProps & ModalVariant;

function Modal({ isDim, className, children }: PropsWithChildren<ModalProps>) {
  const setActiveModal = useModalStore((state) => state.setActiveModal);
  const activeModal = useModalStore((state) => state.activeModal);
  const resetNotifyList = useNotifyStore((state) => state.resetNotifyList);

  const handleClickOutOfRange: ComponentProps<"div">["onClick"] = (e) => {
    if (e.target === e.currentTarget) {
      if (activeModal?.type.name === "NotifyListModal") {
        console.log("reseted Notify List");
        resetNotifyList();
      }
      setActiveModal(null);
    }
  };

  return (
    <div
      onClick={handleClickOutOfRange}
      className={modalVariant({ isDim, className })}
    >
      {children}
    </div>
  );
}

export default Modal;
