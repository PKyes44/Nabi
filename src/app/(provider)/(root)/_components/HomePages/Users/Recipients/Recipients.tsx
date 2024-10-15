"use client";

import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import User from "../User";
import Pagination from "./Pagination";

interface RecipientsProps {
  page: number;
}

function Recipients({ page }: RecipientsProps) {
  const { data: recipients, isLoading } = useQuery({
    queryKey: ["userProfiles", { role: "recipient" }],
    queryFn: () =>
      clientApi.profiles.getProfilesFilterByRoleAndSponsorShipCount(
        "recipient"
      ),
  });

  if (isLoading) return <span>데이터를 불러오는 중 ..</span>;
  const startNum = page === 1 ? 0 : (page - 1) * 5 + 1;
  const endNum = page === 1 ? 5 : page * 5;
  return (
    <article className="bg-white h-[360px] px-6 pt-5 flex flex-col gap-y-5 rounded-lg">
      <h2 className="flex items-center mx-auto gap-x-2">
        <img
          className="w-5 aspect-square"
          src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Heart.png"
          alt="heart icon"
        />
        도움이 필요한 아이들
      </h2>
      <ul className="grid grid-cols-1 grid-rows-5 gap-y-2">
        {recipients!.slice(startNum, endNum).map((recipient) => {
          return (
            <li key={recipient.userId}>
              <User user={recipient} />
            </li>
          );
        })}
      </ul>
      <Pagination page={page} />
    </article>
  );
}

export default Recipients;
