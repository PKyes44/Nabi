import { ComponentProps, PropsWithChildren } from "react";

interface ModalProps {
  className?: string;
  onClickFn: ComponentProps<"div">["onClick"];
}

function Modal({
  className,
  onClickFn,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <div
      className={`${className} w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-45 z-20`}
      onClick={onClickFn}
    >
      {children}
    </div>
  );
}

export default Modal;
