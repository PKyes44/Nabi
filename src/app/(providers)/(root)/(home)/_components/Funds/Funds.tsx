"use client";

import Fund from "./Fund";

function Funds() {
  return (
    <article className="bg-white h-[550px] px-6 py-5 flex flex-col gap-y-5 rounded-lg shadow-sm">
      <h2 className="flex items-center mx-auto gap-x-2 font-bold">
        영역별 후원 기금 사업
      </h2>

      <section className="grid grid-cols-2 grid-rows-4 gap-3 h-full w-full">
        <Fund domain="건강" />
        <Fund domain="교육" />
        <Fund domain="노동" />
        <Fund domain="문화" />
        <Fund domain="사회참여" />
        <Fund domain="안전" />
        <Fund domain="주거" />
        <Fund domain="환경" />
      </section>
    </article>
  );
}

export default Funds;
