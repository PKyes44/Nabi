"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import RecruitPost from "./_components/RecruitPost";

function RecruitsPage() {
  const { data: recruits } = useQuery({
    queryKey: ["recruits"],
    queryFn: clientApi.recruits.getRecruits,
  });

  return (
    <Page
      width="lg"
      isMain={false}
      className="h-full flex items-center justify-between py-10"
    >
      <div className="grid grid-cols-4 gap-x-5 w-full">
        <div className="bg-white h-60"></div>
        <div className="col-span-2">
          <Link
            href="/recruits/new"
            className="w-full block bg-white text-center py-3 text-[15px]"
          >
            글 작성
          </Link>
          <ul className="mt-5 w-full">
            {recruits?.map((recruit) => (
              <RecruitPost key={recruit.recruitId} recruit={recruit} />
            ))}
          </ul>
        </div>
        <div className="bg-white h-60"></div>
      </div>
    </Page>
  );
}

export default RecruitsPage;
