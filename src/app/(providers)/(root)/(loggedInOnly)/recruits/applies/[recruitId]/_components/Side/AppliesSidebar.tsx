import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import dayjs from "dayjs";
import OtherInformation from "./OtherInformation";

interface AppliesSidebarProps {
  recruitData: Tables<"recruits">;
  approvedRecipientApplies: WithProfiles<Tables<"recipientMeets">>[];
  rejectedRecipientApplies: WithProfiles<Tables<"recipientMeets">>[];
  approvedSponsorApplies: WithProfiles<Tables<"sponsorMeets">>[];
  rejectedSponsorApplies: WithProfiles<Tables<"sponsorMeets">>[];
}

function AppliesSidebar({
  recruitData,
  approvedRecipientApplies,
  rejectedRecipientApplies,
  approvedSponsorApplies,
  rejectedSponsorApplies,
}: AppliesSidebarProps) {
  return (
    <section className="grow">
      <ul className="flex flex-col gap-y-5">
        <li key="글 정보" className="bg-white rounded-lg shadow-md py-4 px-5">
          <OtherInformation title="글 정보">
            <div className="grid grid-cols-2 gap-y-2">
              <label className="font-semibold text-sm">집합 장소</label>
              <span className="text-sm">{recruitData?.region}</span>
              <label className="font-semibold text-sm">신청 마감일</label>
              <span className="text-sm">
                {dayjs(recruitData?.deadLineDate).format("YYYY-MM-DD")}
              </span>
              <label className="font-semibold text-sm">봉사 활동일</label>
              <span className="text-sm">
                {dayjs(recruitData?.volunteeringDate).format("YYYY-MM-DD")}
              </span>
              <label className="font-semibold text-sm">작성일</label>
              <span className="text-sm">
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
