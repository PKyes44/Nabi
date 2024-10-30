import Image from "next/image";
import Link from "next/link";

interface ProfileItemProps {
  profileImageUrl?: string | null;
  nickname: string;
  userId: string;
  className?: string;
}

const DEFAULT_PROFILE_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/BigDefaultProfile.png?t=2024-10-17T21%3A23%3A00.314Z";

function ProfileItem({
  profileImageUrl,
  nickname,
  userId,
  className,
}: ProfileItemProps) {
  return (
    <Link
      href={`/profiles?userId=${userId}`}
      className={`flex items-center gap-x-4 ${className}`}
    >
      <Image
        width={80}
        height={80}
        src={profileImageUrl || DEFAULT_PROFILE_IMG}
        alt="profile image"
        className="w-6 aspect-square object-cover rounded-lg sm:w-4"
      />
      <span className="line-clamp-4 text-sm sm:text-[8px] overflow-hidden whitespace-nowrap text-ellipsis">
        {nickname}
      </span>
    </Link>
  );
}

export default ProfileItem;
