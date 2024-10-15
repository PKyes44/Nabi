"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Recipients from "./Recipients/Recipients";
import Sponsors from "./Sponsors/Sponsors";

interface UsersProps {
  page: string;
}

function Users({ page = "1" }: UsersProps) {
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  if (isLoading) return <span>데이터를 불러오는 중</span>;

  return (
    <article className="bg-white h-80 px-4 pt-5 flex flex-col gap-y-5 rounded-lg">
      {userProfile ? (
        userProfile!.role === "recipient" ? (
          <Sponsors />
        ) : (
          <Recipients page={+page} />
        )
      ) : (
        <Recipients page={+page} />
      )}
    </article>
  );
}

export default Users;
