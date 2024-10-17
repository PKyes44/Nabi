/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import Link from "next/link";

interface RecipientProps {
  user: Tables<"userProfiles">;
}

function User({ user }: RecipientProps) {
  return (
    <Link
      href={`/profiles?userId=${user.userId}`}
      className="flex items-center gap-x-4 "
    >
      {user.bgImageUrl ? (
        <img
          src={user.bgImageUrl}
          alt="profile image"
          className="w-10 aspect-square  rounded-lg"
        />
      ) : (
        <div className="w-10 aspect-square rounded-lg grid place-items-center bg-[#f5f5f5]">
          <img
            className="object-cover w-8/12"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
            alt="default profile"
          />
        </div>
      )}
      <span>{user.nickname}</span>
    </Link>
  );
}

export default User;
