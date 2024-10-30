/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import Recruit from "../Recruit/Recruit";
import useRecruitList from "./RecruitList.hooks";

interface RecruitListProps {
  initialRecruitList: (WithProfiles<Tables<"recruits">> & {
    replies: WithProfiles<Tables<"replies">>[];
  })[];
}

function RecruitList({ initialRecruitList }: RecruitListProps) {
  const { recruitsData, isLoading, observerRef } =
    useRecruitList(initialRecruitList);

  return (
    <ul className="w-full flex flex-col gap-y-4 sm:gap-y-1">
      {recruitsData.pages.map((page) =>
        page?.map((recruit) => (
          <li key={recruit.recruitId}>
            <Recruit recruit={recruit} />
          </li>
        ))
      )}

      {isLoading && <div className="m-auto">Loading...</div>}
      <div ref={observerRef} />
    </ul>
  );
}

export default RecruitList;
