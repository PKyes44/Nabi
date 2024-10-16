import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

const modalVariant = cva("w-screen h-screen absolute top-0 left-0 z-20 ", {
  variants: {
    dim: {
      true: "bg-black bg-opacity-45",
      false: "",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    dim: true,
  },
});

type ModalVariant = VariantProps<typeof modalVariant>;

type PassedModalProps = {
  className?: string;
  onClickFn: ComponentProps<"div">["onClick"];
};

type ModalProps = PassedModalProps & ModalVariant;

function Modal({
  className,
  onClickFn,
  children,
  dim,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={`${className} ${modalVariant({ dim })}`}
      onClick={onClickFn}
    >
      {children}
    </div>
  );
}

export default Modal;
