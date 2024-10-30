"use client";

import clientApi from "@/api/clientSide/api";
import ProfileItem from "@/components/ProfileItem/ProfileItem";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OtherInformation from "./OtherInformation";

interface OtherApplyInfosProps {
  otherApplyInfoList: {
    title: string;
    applies: WithProfiles<Tables<"sponsorMeets"> | Tables<"recipientMeets">>[];
  }[];
  recruitId: string;
}

function OtherApplyInfos({
  otherApplyInfoList,
  recruitId,
}: OtherApplyInfosProps) {
  const user = useAuthStore((state) => state.currentUser);

  const [otherApplyInfos, setOtherApplyInfos] = useState<
    {
      title: string;
      applies: WithProfiles<
        Tables<"sponsorMeets"> | Tables<"recipientMeets">
      >[];
    }[]
  >(otherApplyInfoList);

  const { data: approvedSponsorApplies } = useQuery({
    queryKey: ["sponsorMeets", { status: "approved" }],
    queryFn: () =>
      clientApi.sponsorMeets.getApprovedSponsorAppliesWithProfileByRecruitIdAndUserId(
        recruitId,
        user!.userId
      ),
  });
  const { data: rejectedSponsorApplies } = useQuery({
    queryKey: ["sponsorMeets", { status: "rejected" }],
    queryFn: () =>
      clientApi.sponsorMeets.getRejectedSponsorAppliesWithProfileByRecruitId(
        recruitId
      ),
  });
  const { data: approvedRecipientApplies } = useQuery({
    queryKey: ["recipientMeets", { status: "approved" }],
    queryFn: () =>
      clientApi.recipientMeets.getApprovedRecipientAppliesWithProfileByRecruitIdAndUserId(
        recruitId,
        user!.userId
      ),
  });
  const { data: rejectedRecipientApplies } = useQuery({
    queryKey: ["recipientMeets", { status: "rejected" }],
    queryFn: () =>
      clientApi.recipientMeets.getRejectedRecipientAppliesWithProfileByRecruitId(
        recruitId
      ),
  });

  useEffect(() => {
    if (
      !rejectedRecipientApplies &&
      !rejectedSponsorApplies &&
      !approvedSponsorApplies &&
      !approvedRecipientApplies
    )
      return;

    setOtherApplyInfos((prevOtherApplyInfos) => {
      return prevOtherApplyInfos.map((prevOtherApply) => {
        if (
          prevOtherApply.title === "승인된 후원자 목록" &&
          approvedSponsorApplies
        )
          return {
            ...prevOtherApply,
            applies: approvedSponsorApplies!,
          };

        if (
          prevOtherApply.title === "거절된 후원자 목록" &&
          rejectedSponsorApplies
        )
          return {
            ...prevOtherApply,
            applies: rejectedSponsorApplies!,
          };

        if (
          prevOtherApply.title === "승인된 후원아동 목록" &&
          approvedRecipientApplies
        )
          return {
            ...prevOtherApply,
            applies: approvedRecipientApplies!,
          };

        if (
          prevOtherApply.title === "거절된 후원아동 목록" &&
          rejectedRecipientApplies
        )
          return {
            ...prevOtherApply,
            applies: rejectedRecipientApplies!,
          };

        return prevOtherApply;
      });
    });
  }, [
    rejectedRecipientApplies,
    rejectedSponsorApplies,
    approvedRecipientApplies,
    approvedSponsorApplies,
  ]);

  return (
    <section className="grow">
      <ul className="flex flex-col gap-y-5 w-full sm:grid sm:grid-cols-2 sm:gap-y-3 sm:gap-x-3">
        {otherApplyInfos.map((otherApplies) => {
          return (
            otherApplies.applies &&
            otherApplies.applies.length !== 0 && (
              <li
                className="bg-white rounded-lg shadow-md py-4 px-5 w-full text-xl md:text-lg"
                key={otherApplies.title}
              >
                <OtherInformation title={otherApplies.title}>
                  {otherApplies.applies?.map((user) => (
                    <li key={user.meetId}>
                      <ProfileItem
                        className="m-auto"
                        nickname={user.userProfiles.nickname}
                        profileImageUrl={user.userProfiles.profileImageUrl}
                        userId={user.userProfiles.userId}
                      />
                    </li>
                  ))}
                </OtherInformation>
              </li>
            )
          );
        })}
      </ul>
    </section>
  );
}

export default OtherApplyInfos;
