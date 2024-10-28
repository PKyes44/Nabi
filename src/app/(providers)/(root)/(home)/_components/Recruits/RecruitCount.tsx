"use client";

import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import Image from "next/image";

interface RecruitCountProps {
  recruit:
    | Tables<"recruits">
    | (Tables<"recruits"> & { userProfiles: Tables<"userProfiles"> });
}

function RecruitCount({ recruit }: RecruitCountProps) {
  const user = useAuthStore((state) => state.currentUser);

  return (
    <div className="flex gap-x-2 items-center group relative">
      <Image
        width={100}
        height={100}
        className="w-4"
        src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BlackIconList/RecruitCount.png?t=2024-10-28T07%3A43%3A17.047Z"
        alt="recruit count icon"
      />
      <span className="font-light text-xs">
        {user?.role === "sponsor"
          ? recruit.maxSponsorRecruits
          : recruit.maxRecipientRecruits}
        명
      </span>
      <span className="whitespace-nowrap absolute top-6 -left-1/2 font-normal text-xs invisible group-hover:visible">
        {user?.role === "sponsor" ? "후원자 모집인원" : "후원아동 모집인원"}
      </span>
    </div>
  );
}

export default RecruitCount;
