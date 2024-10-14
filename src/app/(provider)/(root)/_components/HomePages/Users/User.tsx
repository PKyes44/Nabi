import Button from "@/components/Button/Button";
import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";

interface RecipientProps {
  user: Tables<"userProfiles">;
}

function User({ user }: RecipientProps) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const userId = useAuthStore((state) => state.currentUserId);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleLinkToChat: ComponentProps<"button">["onClick"] = (e) => {
    e.stopPropagation();
    router.push(`/chats?showChatUserId=${user.userId}`);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="relative flex items-center"
    >
      <Link
        href={`/profiles?userId=${user.userId}`}
        className="flex items-center gap-x-2 "
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
      {isHovering && (
        <div className="bg-white absolute right-0 text-center">
          <Button
            onClick={handleLinkToChat}
            className=""
            intent="primary"
            textIntent="primary"
          >
            채팅하기
          </Button>
        </div>
      )}
    </div>
  );
}

export default User;
