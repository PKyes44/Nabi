"use client";
import { Tables } from "@/supabase/database.types";
import Image from "next/image";
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

type ApprovedUserProps = {
  recruit: Recruit;
  isSponsor: boolean;
};

function ApprovedUser({ recruit, isSponsor }: ApprovedUserProps) {
  return recruit.sponsorMeets
    .filter((user) => user.isApproved && user.isSponsor === isSponsor)
    .map((user) => (
      <Link
        href={`/profiles?userId=${user.userId}`}
        className="flex items-center gap-x-3 justify-center"
        key={user.userId}
      >
        {user.userProfiles?.profileImageUrl ? (
          <Image
            width={100}
            height={100}
            src={user.userProfiles.profileImageUrl}
            alt="profile image"
            className="w-7 aspect-square  rounded-lg"
          />
        ) : (
          <div className="w-7 aspect-square rounded-lg grid place-items-center bg-[#f5f5f5]">
            <Image
              height={100}
              width={100}
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
        <button
          onClick={(e) => e.preventDefault()}
          disabled
          className="w-14 px-0 py-0.5 bg-black border-none bg-opacity-80 rounded-sm text-white text-sm"
        >
          승인됨
        </button>
      </Link>
    ));
}

export default ApprovedUser;
