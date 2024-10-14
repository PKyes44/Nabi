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
    <>
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
    </>
  );
}

export default Recipients;
