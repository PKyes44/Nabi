import { Tables } from "@/supabase/database.types";
import Link from "next/link";

interface RecipientProps {
  user: Tables<"userProfiles">;
}

function User({ user }: RecipientProps) {
  return (
    <Link
      href={`/profiles?userId=${user.userId}`}
      className="flex items-center gap-x-2"
    >
      {user.bgImageUrl ? (
        <img
          src={user.bgImageUrl}
          alt="profile image"
          className="w-10 aspect-square bg-gray-500 rounded-lg"
        />
      ) : (
        <div className="w-10 aspect-square bg-gray-500 rounded-lg" />
      )}
      <span>{user.nickname}</span>
    </Link>
  );
}

export default User;
