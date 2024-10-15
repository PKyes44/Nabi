"use client";

import clientApi from "@/api/clientSide/api";
import { UserProfiles } from "@/types/customDatabase";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";

interface ProfileSideBarProps {
  profile: UserProfiles["Row"];
}

function ProfileSideBar({ profile }: ProfileSideBarProps) {
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const currentRoleType = useAuthStore((state) => state.roleType);

  // 후원자가 본인 프로필을 봤을 때 모집글 불러오기
  const { data: myRecruits } = useQuery({
    queryKey: ["recruits", { userId: profile.userId }],
    queryFn: () => clientApi.recruits.getSortedMyRecruits(profile.userId),
    enabled: profile.role === "sponsor" && currentUserId === profile.userId,
  });

  const { data: recentlySponsorships } = useQuery({
    queryKey: ["recruits", { profile }],
    queryFn: () =>
      clientApi.sponsorMeets.getRecentlySponsorship(
        profile.userId,
        profile.role
      ),
  });

  return (
    <article className="grow bg-gray-300 h-full rounded-lg text-center">
      {profile.role === "sponsor" ? (
        currentUserId === profile.userId ? (
          // 후원자 본인 프로필
          <>
            <strong>모집글 목록</strong>
            <ul className="flex flex-col gap-y-4 items-center ">
              {myRecruits?.map((recruit) => (
                <li
                  className="w-32 h-16 bg-yellow-300 "
                  key={recruit.recruitId}
                >
                  <p>{recruit.title}</p>
                  <p>{recruit.content}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          // 다른 후원자의 프로필
          <>
            <strong>이 후원자가 최근에 후원한 아이들</strong>
            <ul>
              {recentlySponsorships?.map((recentlySponsorship) => (
                <li key={recentlySponsorship.userId}>
                  {recentlySponsorship.userProfiles?.nickname}
                </li>
              ))}
            </ul>
          </>
        )
      ) : (
        // 다른 후원아동의 프로필
        <>
          <strong>이 아동에게 최근 후원한 후원자</strong>
          <ul>
            {recentlySponsorships?.map((recentlySponsorship) => (
              <li key={recentlySponsorship.userId}>
                {recentlySponsorship.userProfiles?.nickname}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

export default ProfileSideBar;
