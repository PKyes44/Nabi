"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

function Profile() {
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  if (isLoading) return <span>프로필 로딩 중 ..</span>;

  return (
    <div className="flex gap-x-7">
      <article className="w-[900px] h-[600px] bg-gray-300 rounded-lg">
        {/* {profile} */}
      </article>
      <article className="grow h-96 bg-gray-300 rounded-lg"></article>
    </div>
  );
}

export default Profile;
