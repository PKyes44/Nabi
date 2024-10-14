"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import RecruitDetails from "./_components/RecruitDetails";

function RecruitsPage() {
  const { data: recruits, isLoading } = useQuery({
    queryKey: ["recruits"],
    queryFn: clientApi.recruits.getRecruits,
  });

  return (
    <Page
      width="lg"
      isMain={false}
      className="h-full flex items-center justify-between py-20"
    >
      <div className="grid grid-cols-4 gap-x-5 w-full">
        <div className="bg-white h-60"></div>
        <div className="col-span-2">
          <Link
            href={"/recruits/new"}
            className="w-full block bg-white text-center py-3 text-[15px]"
          >
            글 작성
          </Link>
          {isLoading && (
            <div className="mt-5 text-center text-gray-500">로딩 중...</div>
          )}
          <ul className="mt-5 w-full">
            {recruits?.map((recruit) => (
              <li
                key={recruit.recruitId}
                className="bg-white mb-2 p-10 rounded-md relative"
              >
                <RecruitDetails recruit={recruit} />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white h-60"></div>
      </div>
    </Page>
  );
}

export default RecruitsPage;
