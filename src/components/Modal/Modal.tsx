import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

const modalVariant = cva("", {
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

type ModalProps = ModalVariant & {
  className?: string;
  onClickFn: ComponentProps<"div">["onClick"];
};

function Modal({
  isDim,
  className,
  onClickFn,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={`w-screen h-screen absolute top-0 left-0 z-20 ${modalVariant({
        isDim,
      })} ${className} `}
      onClick={onClickFn}
    >
      {children}
    </div>
  );
}

export default Modal;
