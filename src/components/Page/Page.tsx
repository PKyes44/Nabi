import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const pageVariant = cva("m-auto", {
  variants: {
    width: {
      sm: "max-w-[600px] px-5",
      md: "max-w-[800px] px-5",
      lg: "max-w-[1200px] px-5",
      full: "w-full",
    },
    isMain: {
      true: "min-h-[calc(100vh-64px-160px)]",
      false: "",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    width: "md",
    isMain: true,
  },
});

type PageVariant = VariantProps<typeof pageVariant>;
type pageProps = {
  className?: string;
};
type PageProps = PageVariant & PropsWithChildren<pageProps>;

function Page({ width, isMain, className, children }: PageProps) {
  return (
    <div className={`${pageVariant({ width, isMain })} ${className} pt-16`}>
      {children}
    </div>
  );
}

export default Page;
