import { Tables } from "@/supabase/database.types";
import dayjs from "dayjs";
import OtherInformation from "./OtherInformation";

interface AppliesSidebarProps {
  recruitData: Tables<"recruits">;
}

function AppliesSidebar({ recruitData }: AppliesSidebarProps) {
  return (
    <section className="grow">
      <ul className="flex flex-col gap-y-5">
        <li key="글 정보" className="bg-white rounded-lg shadow-md py-4 px-5">
          <OtherInformation title="글 정보">
            <div className="grid grid-cols-2 gap-y-2 sm:gap-y-1 sm:border-t pt-2">
              <label className="font-semibold text-sm sm:text-[10px]">
                글 제목
              </label>
              <span className="text-sm sm:text-[10px] overflow-hidden whitespace-nowrap text-ellipsis">
                {recruitData.title}
              </span>
              <label className="font-semibold text-sm sm:text-[10px]">
                집합 장소
              </label>
              <span className="text-sm sm:text-[10px] overflow-hidden whitespace-nowrap text-ellipsis">
                {recruitData?.region}
              </span>
              <label className="font-semibold text-sm sm:text-[10px]">
                신청 마감일
              </label>
              <span className="text-sm sm:text-[10px]">
                {dayjs(recruitData?.deadLineDate).format("YYYY-MM-DD")}
              </span>
              <label className="font-semibold text-sm sm:text-[10px]">
                봉사 활동일
              </label>
              <span className="text-sm sm:text-[10px]">
                {dayjs(recruitData?.volunteeringDate).format("YYYY-MM-DD")}
              </span>
              <label className="font-semibold text-sm sm:text-[10px]">
                작성일
              </label>
              <span className="text-sm sm:text-[10px]">
                {dayjs(recruitData?.createdAt).format("YYYY-MM-DD")}
              </span>
            </div>
          </OtherInformation>
        </li>
      </ul>
    </section>
  );
}

export default AppliesSidebar;
