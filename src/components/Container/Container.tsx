import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const containerVariant = cva("m-auto", {
  variants: {
    width: {
      xs: "max-w-[500px] px-5",
      sm: "max-w-[600px] px-5",
      md: "max-w-[800px] px-5",
      lg: "max-w-[1200px] px-5",
      full: "w-full",
    },
    isMain: {
      true: "min-h-[calc(100vh-64px)] mt-16",
      false: "",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    width: "md",
    isMain: true,
  },
});

type ContainerVariant = VariantProps<typeof containerVariant>;
type containerProps = {
  className?: string;
};
type ContainerProps = ContainerVariant & PropsWithChildren<containerProps>;

function Container({ width, isMain, className, children }: ContainerProps) {
  return (
    <div className={`${containerVariant({ width, isMain })} ${className} `}>
      {children}
    </div>
  );
}

export default Container;
