"use client";
import clientApi from "@/api/clientSide/api";
import { UserProfiles } from "@/types/customDatabase";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import RecipientList from "./RecipientList";
import SponsorList from "./SponsorList";

interface ProfileSideBarProps {
  profile: UserProfiles["Row"];
}

function ProfileSideBar({ profile }: ProfileSideBarProps) {
  const currentUserId = useAuthStore((state) => state.currentUserId);

  // 후원자가 본인 프로필을 봤을 때 모집글 불러오기
  const { data: myRecruits } = useQuery({
    queryKey: ["myRecruits", { userId: profile.userId }],
    queryFn: () => clientApi.recruits.getSortedMyRecruits(profile.userId),
    enabled: profile.role === "sponsor" && currentUserId === profile.userId,
  });

  // 다른 유저 프로필 봤을 때 최근 후원자 불러오기
  const { data: recentlySponsors } = useQuery({
    queryKey: ["sponsorMeets", { profile }],
    queryFn: () => clientApi.sponsorMeets.getRecentlySponsors(profile.userId),
    enabled: profile.role === "recipient",
  });

  // 다른 유저 프로필 봤을 때 최근 후원아동 불러오기
  const { data: recentlyRecipients } = useQuery({
    queryKey: ["recipientMeets", { profile }],
    queryFn: () =>
      clientApi.recipientMeets.getRecentlyRecipient(profile.userId),
    enabled: profile.role === "sponsor",
  });

  return (
    <article className="grow h-full rounded-lg text-center">
      {profile.role === "sponsor" ? (
        currentUserId === profile.userId ? (
          // 후원자 본인 프로필
          <ul className="flex flex-col gap-y-8 h-full text-start">
            {myRecruits?.map((recruit) => (
              <li
                className="flex flex-col gap-y-2 h-full bg-white py-3 px-2 shadow-md rounded-lg"
                key={recruit.recruitId}
              >
                <h3 className="font-light mx-auto text-center">
                  <span className="font-bold">
                    {recruit.title.length > 5
                      ? recruit.title.slice(0, 5) + "..."
                      : recruit.title}
                  </span>{" "}
                  글의 신청자 목록
                </h3>
                <br />
                <div className="text-center">
                  <SponsorList recruit={recruit} profile={profile} />
                  <br />
                  <RecipientList recruit={recruit} profile={profile} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // 다른 후원자의 프로필
          <>
            <strong>이 후원자가 최근에 후원한 아이들</strong>
            <ul>
              {recentlyRecipients?.map((recipient) => (
                <li key={recipient.userId}>
                  {recipient.userProfiles?.nickname}
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
            {recentlySponsors?.map((sponsor) => (
              <li key={sponsor.userId}>{sponsor.userProfiles?.nickname}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

export default ProfileSideBar;
