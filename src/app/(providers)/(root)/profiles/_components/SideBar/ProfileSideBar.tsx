"use client";
import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import ApplicantList from "./ApplicantList";

interface ProfileSideBarProps {
  profile: Tables<"userProfiles">;
}

function ProfileSideBar({ profile }: ProfileSideBarProps) {
  const user = useAuthStore((state) => state.currentUser);

  // 후원자가 본인 프로필을 봤을 때 모집글 불러오기
  const { data: myRecruits } = useQuery({
    queryKey: ["myRecruits", { userId: profile.userId }],
    queryFn: () => clientApi.recruits.getSortedMyRecruits(profile.userId),
    enabled: profile.role === "sponsor" && user?.userId === profile.userId,
  });

  // 다른 유저 프로필 봤을 때 최근 후원아동 불러오기
  const { data: recentlyRecipients, isLoading } = useQuery({
    queryKey: ["sponsorMeets", { profile }],
    queryFn: () => clientApi.sponsorMeets.getRecentlyRecipients(profile.userId),
    enabled: profile.role === "sponsor",
  });

  // 후원자의 후원매장 불러오기
  const { data: ownerData } = useQuery({
    queryKey: ["storeOwners", { profile }],
    queryFn: () => clientApi.storeOwners.getStoreByUserId(profile.userId),
    enabled: profile.role === "sponsor",
  });

  // 다른 유저 프로필 봤을 때 최근 후원자 불러오기
  const { data: recentlySponsors } = useQuery({
    queryKey: ["recipientMeets", { profile }],
    queryFn: () => clientApi.recipientMeets.getRecentlySponsors(profile.userId),
    enabled: profile.role === "recipient",
  });

  const { data: regularSpons } = useQuery({
    queryKey: ["regularSponsorShips", { profile }],
    queryFn: () => {
      if (profile.role === "sponsor")
        return clientApi.regularSponsorShip.getSponsorshipBySponsorIdReturnRecipient(
          profile.userId
        );

      if (profile.role === "recipient")
        return clientApi.regularSponsorShip.getSponsorshipByRecipientIdReturnSponsor(
          profile.userId
        );
    },
    enabled: !!profile.role,
  });

  if (isLoading) return <span>데이터 로딩 중 ..</span>;

  return (
    <div className="flex flex-col grow gap-y-4">
      {regularSpons && regularSpons.length !== 0 && (
        <article className="text-center bg-white rounded-lg shadow-md py-4 px-7">
          <h3 className="font-bold">
            {profile.role === "sponsor"
              ? "후원 중인 아동 목록"
              : "후원 중인 후원자"}
          </h3>
          <ul className="flex flex-col gap-y-2 pl-7 pr-16 mt-4">
            {regularSpons?.map((user) => {
              return (
                <li key={user.userId}>
                  <Link
                    className="grid grid-cols-2"
                    href={`/profiles?userId=${user.userId}`}
                  >
                    <Image
                      width={300}
                      height={300}
                      src={
                        user.profileImageUrl ||
                        "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z"
                      }
                      alt="profile image"
                      className="w-10 m-auto rounded-full aspect-square object-cover"
                    />
                    <span className="m-auto auto-rows-max">
                      {user.nickname}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      )}
      {profile.role === "sponsor" && (
        <article className="text-center bg-white rounded-lg shadow-md py-4 px-7">
          <h3 className="font-bold">후원 매장</h3>
          <span className="text-xs text-gray-400">
            매장 이름 클릭 시 매장 위치로 이동합니다
          </span>
          <ul className="mt-4">
            {ownerData?.map((store, idx) => {
              const storeData = store.storeDatas;
              console.log("store: ", store);
              return (
                <li key={idx}>
                  <Link
                    href={`/free-meals/map?lat=${storeData.lat}&lng=${storeData.lng}&brandName=${storeData.brandName}`}
                  >
                    {storeData.brandName.length < 15
                      ? storeData.brandName
                      : storeData.brandName.slice(0, 15) + "..."}
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      )}
      <article className="rounded-lg text-center">
        {profile.role === "sponsor" ? (
          user?.userId === profile.userId ? (
            // 후원자 본인 프로필
            <ul className="flex flex-col gap-y-4 h-full text-start">
              {myRecruits?.map((recruit) => (
                <li
                  className="flex flex-col gap-y-2 h-full bg-white py-3 px-2 shadow-md rounded-lg"
                  key={recruit.recruitId}
                >
                  <ApplicantList recruit={recruit} profile={profile} />
                </li>
              ))}
            </ul>
          ) : (
            // 다른 후원자의 프로필
            <div className="bg-white rounded-lg shadow-md py-4 px-5">
              <h3 className="mb-4 font-bold">
                이 후원자가 최근에 후원한 아이들
              </h3>
              <ul className="flex flex-col gap-y-2 pl-10 pr-16">
                {recentlyRecipients &&
                  recentlyRecipients.map((recentlyData, idx) => {
                    const recipient =
                      recentlyData.recruits.recipientMeets[0].userProfiles;
                    return (
                      <li key={idx}>
                        <Link
                          className="grid grid-cols-2"
                          href={`/profiles?userId=${recipient.userId}`}
                        >
                          <Image
                            width={300}
                            height={300}
                            src={
                              recipient.profileImageUrl ||
                              "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z"
                            }
                            alt="profile image"
                            className="w-10 m-auto rounded-full aspect-square object-cover"
                          />
                          <span className="m-auto auto-rows-max">
                            {recipient.nickname}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )
        ) : (
          // 다른 후원아동의 프로필
          recentlySponsors &&
          recentlySponsors?.length !== 0 && (
            <div className="bg-white rounded-lg shadow-md py-4">
              <h3 className="mb-4 font-bold">
                이 후원자가 최근에 후원한 아이들
              </h3>
              <ul>
                {recentlySponsors &&
                  recentlySponsors.map((recentlyData, idx) => {
                    const sponsor =
                      recentlyData.recruits.recipientMeets[0].userProfiles;
                    console.log(sponsor);
                    return (
                      <li key={idx}>
                        <Link
                          className="grid grid-cols-2"
                          href={`/profiles?userId=${sponsor.userId}`}
                        >
                          <Image
                            width={300}
                            height={300}
                            src={
                              sponsor.profileImageUrl ||
                              "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z"
                            }
                            alt="profile image"
                            className="w-10 m-auto rounded-full aspect-square object-cover"
                          />
                          <span className="m-auto auto-rows-max">
                            {sponsor.nickname}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )
        )}
      </article>
    </div>
  );
}

export default ProfileSideBar;
