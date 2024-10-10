import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const pageVariant = cva("m-auto", {
  variants: {
    width: {
      sm: "max-w-[600px] px-5",
      md: "max-w-[800px] px-5",
      lg: "max-w-[1200px] px-5",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    width: "md",
  },
});

type PageVariant = VariantProps<typeof pageVariant>;
type PageProps = PageVariant & PropsWithChildren;

function Page({ width, children }: PageProps) {
  return <div className={`${pageVariant({ width })}`}>{children}</div>;
}

export default Page;
