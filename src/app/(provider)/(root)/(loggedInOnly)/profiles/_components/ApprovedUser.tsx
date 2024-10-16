"use client";
import { Tables } from "@/supabase/database.types";

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
            : user.userProfiles?.nickname.slice(0, 5) + "..."}
        </span>
        <div className="w-14 px-0 py-0.5 bg-black border-none bg-opacity-80 rounded-sm text-white text-sm">
          승인됨
        </div>
      </li>
    ));
}

export default ApprovedUser;
