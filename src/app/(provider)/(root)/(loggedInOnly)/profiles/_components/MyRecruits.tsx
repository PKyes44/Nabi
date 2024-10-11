"use client";

import clientApi from "@/api/clientSide/api";
import { Database } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

function MyRecruits() {
  const currentUserId = useAuthStore((state) => state.currentUserId);

  const { data: myRecruitsData } = useQuery({
    queryKey: ["myRecruits", { currentUserId }],
    queryFn: () => clientApi.recruits.getMyRecruits(currentUserId!),
  });

  const myRecruits =
    myRecruitsData?.data as Database["public"]["Tables"]["recruits"]["Row"][];

  return (
    <article className="grow h-[500px] bg-gray-300 rounded-lg">
      <ul className="flex flex-col gap-y-4 mx-4 my-4">
        {myRecruits?.map((recruit) => (
          <li
            className="px-2 py-1 flex flex-col bg-indigo-300 rounded-sm"
            key={recruit.recruitId}
          >
            <p className="text-sm">
              후원 종류 :{" "}
              {recruit.donationType === "thing"
                ? "물품"
                : recruit.donationType === "talent"
                ? "재능기부"
                : "물품, 재능기부"}
            </p>
            <small>{recruit.region}</small>
            <strong>{recruit.title}</strong>
            <p>{recruit.content}</p>
            <p>모집 인원 - {recruit.maxRecruits}인</p>
            <p>{recruit.status === "recruiting" ? "모집중" : "모집 종료"}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default MyRecruits;
