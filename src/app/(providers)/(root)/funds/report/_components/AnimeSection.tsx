"use client";
import Image from "next/image";
import { RefObject, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";

interface AnimeSectionProps {
  intro: JSX.Element;
  title: string;
}

function AnimeSection({ intro, title }: AnimeSectionProps) {
  const targetRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftHandRef = useRef<HTMLImageElement>(null);
  const rightHandRef = useRef<HTMLImageElement>(null);

  function addClassShow(tempObject: {
    [key: string]: RefObject<HTMLHeadingElement>;
  }) {
    const key = Object.keys(tempObject)[0];
    const refName = key.replace("Ref", "");
    if (tempObject[key].current) {
      tempObject[key].current.classList.remove(`animate-${refName}Hidden`);
      tempObject[key].current.classList.add(`animate-${refName}Show`);
    }
  }

  function addClassHidden(tempObject: {
    [key: string]: RefObject<HTMLHeadingElement>;
  }) {
    const key = Object.keys(tempObject)[0];
    const refName = key.replace("Ref", "");
    if (tempObject[key].current) {
      tempObject[key].current.classList.remove(`animate-${refName}Show`);
      tempObject[key].current.classList.add(`animate-${refName}Hidden`);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addClassShow({ titleRef });
          addClassShow({ leftHandRef });
          addClassShow({ rightHandRef });
        } else {
          addClassHidden({ titleRef });
          addClassHidden({ leftHandRef });
          addClassHidden({ rightHandRef });
        }
      });
    });

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div>
      <div ref={titleRef}>
        <h1 className="font-bold text-5xl mt-20 mb-10">{title}</h1>
        {intro}
      </div>

      <Image
        ref={leftHandRef}
        width={100}
        height={100}
        className="w-20 z-10 absolute top-[500px]"
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
        ref={rightHandRef}
        width={100}
        height={100}
        className="w-20 z-10 absolute top-[450px] right-16"
        src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/hand-2@2x.png"
        alt="hand-2"
      />
      <p ref={targetRef} className="mt-80 opacity-0">
        asd
      </p>
    </div>
  );
}

export default AnimeSection;
