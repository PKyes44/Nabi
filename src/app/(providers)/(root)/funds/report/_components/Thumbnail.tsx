"use client";

import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { PropsWithChildren } from "react";
import Marquee from "react-fast-marquee";

const thumbnailVariant = cva("", {
  variants: {
    theme: {
      finance: "bg-orange-200",
      business: "bg-sky-100",
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
  id,
  title,
  thumbnailSrc,
  intro,
  theme,
  className,
  children,
}: PropsWithChildren<ThumbnailProps>) {
  return (
    <>
      <div id={id} className="w-full h-full">
        <section
          className={` overflow-x-hidden relative w-full flex flex-col gap-y-10 px-14 ${thumbnailVariant(
            { theme, className }
          )}`}
        >
          <div
            className={`${
              theme === "business" ? "bg-sky-400" : "bg-orange-400"
            } w-full aspect-square rounded-full absolute -right-24 top-20`}
          />
          <Image
            className="w-full rounded-full aspect-square absolute -right-20 top-24"
            src={thumbnailSrc}
            width={300}
            height={300}
            alt={`${title} thumbnail`}
          />
          <h1 className="font-bold text-5xl mt-20">{title}</h1>
          {intro}
          <Image
            width={100}
            height={100}
            className="w-20 z-10 absolute top-[550px]"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/hand-1@2x.png"
            alt="hand-1"
          />
          <Marquee
            direction="right"
            className="absolute top-64 left-2 bg-black text-orange-400 font-bold overflow-hidden rounded-3xl h-7"
          >
            <span className="mx-10">더 나은 세상을 향해 달리는 중</span>
            <span>더 나은 세상을 향해 달리는 중</span>
          </Marquee>
          <Image
            width={100}
            height={100}
            className="w-20 z-10 absolute top-[450px] right-16"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/hand-2@2x.png"
            alt="hand-2"
          />
        </section>
        <div>{children}</div>
      </div>
    </>
  );
}

export default Thumbnail;
