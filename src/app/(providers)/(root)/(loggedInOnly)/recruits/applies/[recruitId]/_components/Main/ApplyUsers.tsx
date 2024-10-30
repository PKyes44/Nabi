"use client";

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PendingApplies from "./PendingApplies";

interface ApplyUsersProps {
  recruitData: Tables<"recruits">;
  initialPendingRecipientApplies: WithProfiles<Tables<"recipientMeets">>[];
  initialPendingSponsorApplies: WithProfiles<Tables<"sponsorMeets">>[];
}

function ApplyUsers({
  recruitData,
  initialPendingRecipientApplies,
  initialPendingSponsorApplies,
}: ApplyUsersProps) {
  const [pendingSponsorApplies, setPendingSponsorApplies] = useState(
    initialPendingSponsorApplies
  );
  const [pendingRecipientApplies, setPendingRecipientApplies] = useState(
    initialPendingRecipientApplies
  );

  const { data: pendingRecipientApplyList } = useQuery({
    queryKey: ["recipientMeets", { status: "pending" }],
    queryFn: () =>
      clientApi.recipientMeets.getPendingRecipientAppliesWithProfileByRecruitId(
        recruitData.recruitId
      ),
  });
  const { data: pendingSponsorApplyList } = useQuery({
    queryKey: ["sponsorMeets", { status: "pending" }],
    queryFn: () =>
      clientApi.sponsorMeets.getPendingSponsorAppliesWithProfileByRecruitId(
        recruitData.recruitId
      ),
  });

  useEffect(() => {
    if (!pendingRecipientApplyList) return;

    setPendingRecipientApplies(pendingRecipientApplyList);
  }, [pendingRecipientApplyList]);

  useEffect(() => {
    if (!pendingSponsorApplyList) return;

    setPendingSponsorApplies(pendingSponsorApplyList);
  }, [pendingSponsorApplyList]);

  return (
    <section className=" bg-white rounded-lg shadow-lg px-5 py-4 ">
      <h1 className="font-bold text-xl md:text-lg text-center sm:text-[12px] sm:text-left">
        신청자 현황
      </h1>
      <span className="text-sm text-center block mt-2 sm:text-[10px] sm:leading-3 sm:text-left">
        경제적으로 어려움이 있는 후원 아동들을 위해 후원자들과 모임을 구성하여
        봉사활동을 해보세요 ! <br />
        나비는 후원아동을 돕고자 하는 후원자들을 적극적으로 지원합니다
      </span>

      <section className="grid grid-cols-2 mt-10">
        <PendingApplies
          recruitId={recruitData.recruitId}
          pendingApplies={pendingSponsorApplies}
          title="후원자"
        />
        <PendingApplies
          recruitId={recruitData.recruitId}
          pendingApplies={pendingRecipientApplies}
          title="후원아동"
        />
      </section>
    </section>
  );
}

export default ApplyUsers;
