"use client";
import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { UserProfiles } from "@/types/customDatabase";
import { useAuthStore } from "@/zustand/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ProfileSideBarProps {
  profile: UserProfiles["Row"];
}

function ProfileSideBar({ profile }: ProfileSideBarProps) {
  const queryClient = useQueryClient();
  const currentUserId = useAuthStore((state) => state.currentUserId);

  // 후원자가 본인 프로필을 봤을 때 모집글 불러오기
  const { data: myRecruits } = useQuery({
    queryKey: ["recruits", { userId: profile.userId }],
    queryFn: () => clientApi.recruits.getSortedMyRecruits(profile.userId),
    enabled: profile.role === "sponsor" && currentUserId === profile.userId,
  });

  // 수락하기
  const { mutate: approved } = useMutation({
    mutationFn: (userId: string) => clientApi.sponsorMeets.approvedUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruits", { userId: profile.userId }],
      });
    },
  });

  // 다른 유저 프로필 봤을 때 최근 후원자|후원아동 불러오기
  const { data: recentlySponsorships } = useQuery({
    queryKey: ["recruits", { profile }],
    queryFn: () =>
      clientApi.sponsorMeets.getRecentlySponsorship(
        profile.userId,
        profile.role
      ),
  });

  const handleClickApproved = (userId: string) => {
    approved(userId);
  };

  return (
    <article className="grow bg-white shadow-md h-full rounded-lg text-center">
      {profile.role === "sponsor" ? (
        currentUserId === profile.userId ? (
          // 후원자 본인 프로필
          <>
            <ul className="flex flex-col gap-y-4 text-start items-center py-3 px-2">
              {myRecruits?.map((recruit) => (
                <>
                  <li className="flex flex-col gap-y-2" key={recruit.recruitId}>
                    <h3 className="font-light mx-auto text-center">
                      <span className="font-bold">{recruit.title}</span> 글의
                      신청자 목록
                    </h3>
                    {recruit.sponsorMeets.some((user) => user.isSponsor) &&
                      recruit.maxSponsorRecruits >=
                        recruit.sponsorMeets.filter(
                          (user) => user.isSponsor && user.isApproved
                        ).length && (
                        <div className="text-center">
                          <strong className="font-medium">
                            신청한 후원자 목록 (
                            {
                              recruit.sponsorMeets.filter(
                                (user) => user.isSponsor && user.isApproved
                              ).length
                            }
                            /{recruit.maxSponsorRecruits})
                          </strong>
                          <ul className="mt-2 flex flex-col gap-y-3">
                            {
                              // recruit.maxSponsorRecruits >
                              //   recruit.sponsorMeets.filter(
                              //     (user) => user.isSponsor && user.isApproved
                              //   ).length &&
                              recruit.sponsorMeets
                                .filter(
                                  (user) => user.isSponsor
                                  //  && !user.isApproved
                                )
                                .map((user) => (
                                  <li
                                    className="flex items-center gap-x-3 justify-center"
                                    key={user.userId}
                                  >
                                    {user.userProfiles?.profileImageUrl ? (
                                      <img
                                        src={user.userProfiles.profileImageUrl}
                                        alt="profile image"
                                        className="w-7 aspect-square  rounded-lg"
                                      />
                                    ) : (
                                      <div className="w-7 aspect-square rounded-lg grid place-items-center bg-[#f5f5f5]">
                                        <img
                                          className="object-cover w-8/12"
                                          src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
                                          alt="default profile"
                                        />
                                      </div>
                                    )}
                                    <span>
                                      {user.userProfiles!.nickname.length < 6
                                        ? user.userProfiles?.nickname
                                        : user.userProfiles?.nickname.slice(
                                            0,
                                            5
                                          ) + "..."}
                                    </span>
                                    {user.isApproved ? (
                                      <Button
                                        intent="disabled"
                                        rounded="sm"
                                        className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
                                        disabled
                                        onClick={() =>
                                          handleClickApproved(user.userId)
                                        }
                                      >
                                        승인됨
                                      </Button>
                                    ) : (
                                      <Button
                                        intent="primary"
                                        rounded="sm"
                                        textIntent="primary"
                                        className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
                                        onClick={() =>
                                          handleClickApproved(user.userId)
                                        }
                                      >
                                        승인
                                      </Button>
                                    )}
                                  </li>
                                ))
                            }
                          </ul>
                        </div>
                      )}
                    <br />
                    {recruit.sponsorMeets.some((user) => !user.isSponsor) &&
                      recruit.maxRecipientRecruits >=
                        recruit.sponsorMeets.filter(
                          (user) => !user.isSponsor && user.isApproved
                        ).length && (
                        <div className="text-center">
                          <strong className="font-medium">
                            신청한 아동 목록(
                            {
                              recruit.sponsorMeets.filter(
                                (user) => !user.isSponsor && user.isApproved
                              ).length
                            }
                            /{recruit.maxSponsorRecruits})
                          </strong>
                          <ul className="mt-2 flex flex-col gap-y-3">
                            {recruit.maxSponsorRecruits >
                              recruit.sponsorMeets.filter(
                                (user) => !user.isSponsor && user.isApproved
                              ).length &&
                              recruit.sponsorMeets
                                .filter(
                                  (user) => !user.isSponsor && !user.isApproved
                                )
                                .map((user) => (
                                  <li
                                    className="flex items-center gap-x-3 justify-center"
                                    key={user.userId}
                                  >
                                    {user.userProfiles?.profileImageUrl ? (
                                      <img
                                        src={user.userProfiles.profileImageUrl}
                                        alt="profile image"
                                        className="w-7 aspect-square  rounded-lg"
                                      />
                                    ) : (
                                      <div className="w-7 aspect-square rounded-lg grid place-items-center bg-[#f5f5f5]">
                                        <img
                                          className="object-cover w-8/12"
                                          src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
                                          alt="default profile"
                                        />
                                      </div>
                                    )}
                                    <span>
                                      {user.userProfiles!.nickname.length < 6
                                        ? user.userProfiles?.nickname
                                        : user.userProfiles?.nickname.slice(
                                            0,
                                            5
                                          ) + "..."}
                                    </span>

                                    {user.isApproved ? (
                                      <Button
                                        intent="disabled"
                                        rounded="sm"
                                        className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
                                        disabled
                                        onClick={() =>
                                          handleClickApproved(user.userId)
                                        }
                                      >
                                        승인됨
                                      </Button>
                                    ) : (
                                      <Button
                                        intent="primary"
                                        rounded="sm"
                                        textIntent="primary"
                                        className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
                                        onClick={() =>
                                          handleClickApproved(user.userId)
                                        }
                                      >
                                        승인
                                      </Button>
                                    )}
                                  </li>
                                ))}
                          </ul>
                        </div>
                      )}
                  </li>
                </>
              ))}
            </ul>

            <ul></ul>
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
