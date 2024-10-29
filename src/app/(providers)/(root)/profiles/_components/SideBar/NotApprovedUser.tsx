"use client";

import { Tables } from "@/supabase/database.types";
import Link from "next/link";
import DecisionButton from "./DecisionButton";

/* eslint-disable @next/next/no-img-element */

type Sponsor = Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};
type Recipient = Pick<Tables<"recipientMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};

type NotApprovedUserProps = {
  user: Sponsor | Recipient;
  profile: Tables<"userProfiles">;
  recruitId: string;
};

const DEFAULT_PROFILE_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png";

function NotApprovedUser({ profile, user, recruitId }: NotApprovedUserProps) {
  return (
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
            src={DEFAULT_PROFILE_IMG}
            alt="default profile"
          />
        </div>
      )}
      <span>
        {user.userProfiles!.nickname.length < 6
          ? user.userProfiles?.nickname
          : user.userProfiles?.nickname.slice(0, 5) + "..."}
      </span>
      <DecisionButton user={user} profile={profile} recruitId={recruitId} />
    </Link>
  );
}

export default NotApprovedUser;
