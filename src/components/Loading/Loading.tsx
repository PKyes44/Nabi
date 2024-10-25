"use client";

import { animated, useChain, useSpring, useSpringRef } from "@react-spring/web";

function Loading() {
  const rightWingRef = useSpringRef();
  const leftWingRef = useSpringRef();

  const rightWingStyles = useSpring({
    ref: rightWingRef,
    from: {
      transform: "rotateX(200deg)",
    },
    to: async (next) => {
      await next({
        transform: "rotateX(60deg)",
      });
      await next({
        transform: "rotateX(200deg)",
      });
    },
    config: { mass: 1, tension: 200, friction: 120, duration: 600 },
    loop: true,
  });
  const leftWingStyles = useSpring({
    ref: leftWingRef,
    from: {
      transform: "rotateX(110deg)",
    },
    to: async (next) => {
      await next({
        transform: "rotateX(20deg)",
      });
      await next({
        transform: "rotateX(110deg)",
      });
    },
    config: { mass: 1, tension: 200, friction: 120, duration: 600 },
    loop: true,
  });

  useChain([rightWingRef, leftWingRef], [0, 0]);

  return (
    <animated.article
      className="w-32 aspect-square absolute top-[35%] left-[45%] -translate-y-1/2 -translate-x-1/2 grid place-items-center"
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(30deg)",
      }}
    >
      <animated.div
        className={`
          rounded-lg w-16 z-20
          rotate-[130deg] absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2`}
      >
        {/* 날개 뒷면 */}
        <animated.div
          className="absolute top-1 rotate-[13deg]"
          style={{ ...leftWingStyles, transformStyle: "preserve-3d" }}
        >
          {/* 윗날개 */}
          <animated.div
            className={`
          bg-[#FCEC63] w-7 h-8 rounded-b-full rounded-l-full  border-[4px] border-black
            absolute -left-1 rotate-[1deg]
          `}
          />
          {/* 아랫날개 */}
          <animated.div
            className={`
          bg-[#FCEC63] w-12 h-12 rounded-b-full rounded-r-full border-[4px] border-black
            absolute left-5 rotate-[1deg]
          `}
          />
        </animated.div>
        {/* 날개 앞면 */}
        <animated.div
          className="absolute top-1 left-0"
          style={{
            transformStyle: "preserve-3d",
            ...rightWingStyles,
          }}
        >
          {/* 윗날개 */}
          <animated.div
            className={`
          bg-[#FCEC63] w-7 h-8 rounded-b-full rounded-l-full  border-[4px] border-black
            absolute -left-1 rotate-[1deg]
          `}
          />
          {/* 아랫날개 */}
          <animated.div
            className={`
          bg-[#FCEC63] w-12 h-12 rounded-b-full rounded-r-full border-[4px] border-black
            absolute left-5 rotate-[1deg]
          `}
          />
        </animated.div>
      </animated.div>
      <span className="text-center absolute top-[100%] left-[60%] whitespace-nowrap -translate-x-1/2 -translate-y-1/2">
        로딩 중 입니다
      </span>
    </animated.article>
  );
}

export default Loading;
