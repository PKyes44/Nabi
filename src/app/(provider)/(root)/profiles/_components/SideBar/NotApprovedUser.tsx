"use client";

import clientApi from "@/api/clientSide/api";
import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

type UserProfiles = Tables<"userProfiles"> | null;
type SponsorMeets = (Pick<Tables<"sponsorMeets">, "status" | "userId"> & {
  userProfiles: UserProfiles;
})[];
type RecipientMeets = (Pick<Tables<"recipientMeets">, "status" | "userId"> & {
  userProfiles: UserProfiles;
})[];

type NotApprovedUserProps = {
  meets: SponsorMeets | RecipientMeets;
  profile: Tables<"userProfiles">;
  recruitId: string;
};

type ApproveType = {
  userId: string;
  recruitId: string;
  role: string;
};

function NotApprovedUser({ profile, meets, recruitId }: NotApprovedUserProps) {
  const queryClient = useQueryClient();

  // 수락하기
  const { mutate: approved } = useMutation({
    mutationFn: ({ userId, recruitId, role }: ApproveType) =>
      clientApi.sponsorMeets.approveUser(userId, recruitId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myRecruits", { userId: profile.userId }],
      });
    },
  });

  const handleClickApproved = (data: ApproveType) => {
    approved(data);
  };

  return meets
    .filter((user) => user.status === "pending")
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
            handleClickApproved({
              userId: user.userId,
              recruitId,
              role: user.userProfiles!.role,
            });
          }}
        >
          승인
        </Button>
      </Link>
    ));
}

export default NotApprovedUser;
