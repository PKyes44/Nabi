"use client";

import { useAuthStore } from "@/zustand/auth.store";
import Sponsors from "./Sponsors/Sponsors";
import Recipients from "./Recipients/Recipients";

interface UsersProps {
  page: string;
}

function Users({ page = "1" }: UsersProps) {
  const userId = useAuthStore((state) => state.currentUserId);
  const roleType = useAuthStore((state) => state.roleType);
  console.log("users");
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
