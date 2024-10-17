"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { UserProfiles } from "@/types/customDatabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

type userProfiles = Tables<"userProfiles"> | null;
type SponsorMeets = (Pick<
  Tables<"sponsorMeets">,
  "isApproved" | "userId" | "isSponsor"
> & {
  userProfiles: userProfiles;
})[];
type Recruit = Tables<"recruits"> & { sponsorMeets: SponsorMeets };

type NotApprovedUserProps = {
  recruit: Recruit;
  profile: UserProfiles["Row"];
  isSponsor: boolean;
};
function NotApprovedUser({
  recruit,
  profile,
  isSponsor,
}: NotApprovedUserProps) {
  const queryClient = useQueryClient();

  // 수락하기
  const { mutate: approved } = useMutation({
    mutationFn: ({
      userId,
      recruitId,
    }: {
      userId: string;
      recruitId: string;
    }) => clientApi.sponsorMeets.approvedUser(userId, recruitId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myRecruits", { userId: profile.userId }],
      });
    },
  });

  const handleClickApproved = (userId: string, recruitId: string) => {
    const data = {
      userId,
      recruitId,
    };
    approved(data);
  };

  return recruit.sponsorMeets
    .filter((user) => user.isSponsor === isSponsor && !user.isApproved)
    .map((user) => (
      <Link
        href={`/profiles?userId=${user.userId}`}
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
            : user.userProfiles?.nickname.slice(0, 5) + "..."}
        </span>
        <Button
          intent="primary"
          rounded="sm"
          textIntent="primary"
          className="w-14 !px-0 !py-0.5 border-none bg-black text-white text-sm"
          onClick={(e) => {
            e.preventDefault();
            handleClickApproved(user.userId, recruit.recruitId);
          }}
        >
          승인
        </Button>
      </Link>
    ));
}

export default NotApprovedUser;
