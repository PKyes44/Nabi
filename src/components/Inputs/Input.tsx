import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const inputVariant = cva("border", {
  variants: {
    size: {
      sm: "",
      md: "px-4 py-2",
    },
    intent: {
      error: "border-red-500",
      default: "border-black",
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "default",
    rounded: "sm",
    size: "md",
  },
});

type InputVariant = VariantProps<typeof inputVariant>;
type inputProps = {
  inputId: string;
  innerClassName?: string;
  inputClassName?: string;
};
type InputProps = ComponentProps<"input"> & InputVariant & inputProps;

function Input({
  inputId,
  intent,
  rounded,
  innerClassName,
  inputClassName,
  ...props
}: InputProps) {
  return (
    <div className={`${inputVariant({ intent, rounded })} ${innerClassName}`}>
      <input
        id={inputId}
        className={`${inputClassName} w-full outline-none bg-transparent`}
        {...props}
      />
    </div>
  );
}

export default Input;
