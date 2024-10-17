"use client";

import { useAuthStore } from "@/zustand/auth.store";
import Recipients from "./Recipients/Recipients";
import Sponsors from "./Sponsors/Sponsors";

interface UsersProps {
  page: string;
}

function Users({ page = "1" }: UsersProps) {
  const user = useAuthStore((state) => state.currentUser);

  return (
    <>
      {!user?.userId ? (
        user?.role === "recipient" ? (
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
