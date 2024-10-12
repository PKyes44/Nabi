"use client";

import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

function RecruitsPage() {
  const [authorId, setAuthorId] = useState<string | undefined | null>(null);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { data: recruits } = useQuery({
    queryKey: ["recruits"],
    queryFn: clientApi.recruits.getRecruits,
  });

  const date = (dateString: string) => {
    return dateString.split("T")[0];
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setAuthorId(data?.user?.id);
    })();
  }, [isLoggedIn]);

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
              <li
                key={recruit.recruitId}
                className="bg-white mb-2 p-10 rounded-md relative"
              >
                {authorId === recruit.authorId && (
                  <Link
                    href={`recruits/edit/${recruit.recruitId}`}
                    className="border border-black text-sm absolute rounded-md py-1 px-2 right-5 top-5 bg-white"
                  >
                    수정하기
                  </Link>
                )}

                <p className="font-bold text-lg mb-5">{recruit.title}</p>
                <p className="mb-5 text-base">{recruit.content}</p>
                <div className="grid grid-cols-2 gap-y-1 text-sm text-black/50">
                  <span>봉사자 모집 인원 : {recruit.maxSponsorRecruits}</span>
                  <span>
                    후원 아동 모집 인원 : {recruit.maxRecipientRecruits}
                  </span>
                  <span>모집 마감 날짜 : {date(recruit.deadLineDate)}</span>
                  <span>자원 봉사 날짜 : {date(recruit.volunteeringDate)}</span>
                  <span>지역 : {recruit.region}</span>
                </div>
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
