import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, PropsWithChildren } from "react";

const buttonVariant = cva("", {
  variants: {
    outline: {
      true: "border border-black",
      false: "border-none",
    },
    size: {
      sm: "px-14 py-1.5",
      md: "px-28 py-2.5",
    },
    intent: {
      default: "bg-black",
      primary: "bg-yellow-300",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
  compoundVariants: [
    { intent: "default", className: "text-white" },
    { size: "sm", className: "text-sm" },
    {
      size: "md",
      className: "text-base",
    },
  ],
  defaultVariants: {
    outline: false,
    intent: "default",
    size: "sm",
    rounded: "sm",
  },
});

export type ButtonVariant = VariantProps<typeof buttonVariant>;
type buttonProps = {
  className?: string;
};
type ButtonProps = ButtonVariant &
  PropsWithChildren<buttonProps> &
  ComponentProps<"button">;

function Button({ size, intent, outline, className, children }: ButtonProps) {
  return (
    <button
      className={`${className} ${buttonVariant({
        outline,
        size,
        intent,
      })}`}
    >
      {children}
    </button>
  );
}

export default Button;
