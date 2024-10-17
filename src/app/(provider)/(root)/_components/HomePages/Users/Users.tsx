"use client";

import { useAuthStore } from "@/zustand/auth.store";
import Recipients from "./Recipients/Recipients";
import Sponsors from "./Sponsors/Sponsors";

interface UsersProps {
  page: string;
}

function Users({ page = "1" }: UsersProps) {
  const userId = useAuthStore((state) => state.currentUserId);
  const roleType = useAuthStore((state) => state.roleType);

  return (
    <>
      {!userId ? (
        roleType === "recipient" ? (
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
