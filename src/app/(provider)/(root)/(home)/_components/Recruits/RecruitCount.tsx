"use client";

import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";

interface RecruitCountProps {
  recruit:
    | Tables<"recruits">
    | (Tables<"recruits"> & { userProfiles: Tables<"userProfiles"> });
}

function RecruitCount({ recruit }: RecruitCountProps) {
  const roleType = useAuthStore((state) => state.roleType);

  return (
    <div className="flex gap-x-2 items-center group relative">
      <img
        src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/RecruitCount.png?t=2024-10-15T19%3A45%3A09.027Z"
        alt="recruit count icon"
      />
      <span className="font-light text-xs">
        {roleType === "sponsor"
          ? recruit.maxSponsorRecruits
          : recruit.maxRecipientRecruits}
        명
      </span>
      <span className="whitespace-nowrap absolute top-6 -left-1/2 font-normal text-xs invisible group-hover:visible">
        {roleType === "sponsor" ? "후원자 모집인원" : "후원아동 모집인원"}
      </span>
    </div>
  );
}

export default RecruitCount;
