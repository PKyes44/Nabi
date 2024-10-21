"use client";
import { Tables } from "@/supabase/database.types";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

type Sponsor = Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};
type Recipient = Pick<Tables<"recipientMeets">, "userId" | "status"> & {
  userProfiles: Tables<"userProfiles"> | null;
};

type ApprovedUserProps = {
  user: Sponsor | Recipient;
};

function ApprovedUser({ user }: ApprovedUserProps) {
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
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
            alt="default profile"
          />
        </div>
      )}
      <span>
        {user.userProfiles!.nickname.length < 10
          ? user.userProfiles?.nickname
          : user.userProfiles?.nickname.slice(0, 10) + "..."}
      </span>
      <button
        onClick={(e) => e.preventDefault()}
        disabled
        className="w-14 px-0 py-0.5 bg-black border-none bg-opacity-80 rounded-sm text-white text-sm"
      >
        승인됨
      </button>
    </Link>
  );
}

export default ApprovedUser;
