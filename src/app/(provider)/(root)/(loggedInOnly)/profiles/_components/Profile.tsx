"use client";

import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

function Profile() {
  const currentUserId = useAuthStore((state) => state.currentUserId);

  useQuery({
    queryKey: ["userProfiles", { userId: currentUserId }],
    queryFn: () => {},
  });

  return <div>Profile</div>;
}

export default Profile;
