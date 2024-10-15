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
    <>
      {userProfile ? (
        userProfile!.role === "recipient" ? (
          <Sponsors />
        ) : (
          <Recipients page={+page} />
        )
      ) : (
        <Recipients page={+page} />
      )}
    </>
  );
}

export default Users;
