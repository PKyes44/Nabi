/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import Image from "next/image";
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
        <Image
          width={100}
          height={100}
          src={user.bgImageUrl || ""}
          alt="profile image"
          className="w-10 aspect-square  rounded-lg"
        />
      ) : (
        <div className="w-10 aspect-square rounded-lg grid place-items-center bg-[#f5f5f5]">
          <Image
            width={100}
            height={100}
            className="object-cover"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z"
            alt="default profile"
          />
        </div>
      )}
      <span>{user.nickname}</span>
    </Link>
  );
}

export default User;
