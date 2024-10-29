"use client";

import Fund from "./Fund";

function Funds() {
  return (
    <article className=" bg-white h-[550px] mx-32 px-16 py-5 flex flex-col gap-y-5 rounded-lg shadow-sm">
      <h2 className="flex items-center mx-auto gap-x-2 font-bold">
        영역별 후원 기금 사업
      </h2>

      <section className="grid grid-cols-2 grid-rows-4 gap-3 h-full w-full">
        <Fund
          domain="건강"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Health.png?t=2024-10-29T06%3A23%3A41.935Z"
        />
        <Fund
          domain="교육"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Education.png"
        />
        <Fund
          domain="노동"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Work.png"
        />
        <Fund
          domain="문화"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Culture.png?t=2024-10-29T06%3A24%3A15.169Z"
        />
        <Fund
          domain="사회참여"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Social.png?t=2024-10-29T06%3A24%3A21.606Z"
        />
        <Fund
          domain="안전"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Safety.png?t=2024-10-29T06%3A28%3A56.711Z"
        />
        <Fund
          domain="주거"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/House.png?t=2024-10-29T06%3A24%3A36.838Z"
        />
        <Fund
          domain="환경"
          imgUrl="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FundIcons/Environment.png?t=2024-10-29T06%3A24%3A42.625Z"
        />
      </section>
    </article>
  );
}

export default Funds;
