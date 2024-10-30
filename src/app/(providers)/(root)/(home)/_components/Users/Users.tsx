"use client";

import { useAuthStore } from "@/zustand/auth.store";
import Recipients from "./Recipients/Recipients";
import UsersSkeleton from "./Skeleton/UsersSkeleton";
import Sponsors from "./Sponsors/Sponsors";

interface UsersProps {
  page: string;
}

function Users({ page = "1" }: UsersProps) {
  const user = useAuthStore((state) => state.currentUser);
  const role = user?.role;
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  return (
    <>
      {!isAuthInitialized ? (
        <UsersSkeleton />
      ) : user ? (
        role === "recipient" ? (
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
