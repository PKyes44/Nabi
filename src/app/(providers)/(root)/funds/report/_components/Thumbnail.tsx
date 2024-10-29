"use client";

import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { PropsWithChildren } from "react";
import AnimeSection from "./AnimeSection";

const thumbnailVariant = cva(" ", {
  variants: {
    theme: {
      finance: "bg-orange-200",
      business: "bg-sky-100",
      donation: "bg-yellow-100",
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});

type ThumbnailVariant = VariantProps<typeof thumbnailVariant>;

type ThumbnailProps = {
  id: string;
  title: string;
  thumbnailSrc: string;
  intro: JSX.Element;
  className?: string;
} & ThumbnailVariant;

function Thumbnail({
  title,
  thumbnailSrc,
  intro,
  theme,
  className,
  children,
}: PropsWithChildren<ThumbnailProps>) {
  let backgroundColor;
  switch (theme) {
    case "business":
      backgroundColor = "bg-sky-400";
      break;
    case "donation":
      backgroundColor = "bg-yellow-400";
      break;
    case "finance":
      backgroundColor = "bg-orange-400";
      break;
    default:
      backgroundColor = "bg-orange-400";
  }
  return (
    <>
      <section
        className={`overflow-x-hidden relative w-full flex flex-col gap-y-10 px-14 ${thumbnailVariant(
          { theme, className }
        )}`}
      >
        <div
          className={`${backgroundColor} w-full aspect-square rounded-full absolute -right-24 top-20`}
        />
        <Image
          className="w-full rounded-full aspect-square absolute -right-20 top-24"
          src={thumbnailSrc}
          width={300}
          height={300}
          alt={`${title} thumbnail`}
        />
        <AnimeSection title={title} intro={intro} />
      </section>
      {children}
    </>
  );
}

export default Thumbnail;
