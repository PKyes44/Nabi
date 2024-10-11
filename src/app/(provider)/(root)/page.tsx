"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const RecruitsPage = () => {
  const { data: recruits } = useQuery({
    queryKey: ["recruits"],
    queryFn: () => clientApi.recruits.getRecruits(),
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
            후원하러 가기
          </Link>
          <ul className="mt-5 w-full">
            {recruits?.map((recruit) => (
              <li key={recruit.recruitId} className="bg-white mb-2 p-2">
                <Link href={`/recruits/details/${recruit.recruitId}`}>
                  <p className="font-bold text-base">{recruit.title}</p>
                  <p className="text-black/50 text-sm">
                    {recruit.content.length > 20
                      ? `${recruit.content.slice(0, 20)}...`
                      : recruit.content}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white h-60"></div>
      </div>
    </Page>
  );
};

export default RecruitsPage;
