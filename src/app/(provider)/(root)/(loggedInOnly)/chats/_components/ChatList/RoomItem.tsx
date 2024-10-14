import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface RoomItemProps {
  room: {
    roomId: string;
    targetUserId: string;
    userId: string;
    userProfile: {
      nickname: string;
      role: string;
    };
  };
  isActived: boolean;
}

function RoomItem({ room, isActived }: RoomItemProps) {
  const queryClient = useQueryClient();
  const handleClickReloadChat = () => {
    queryClient.invalidateQueries({
      queryKey: ["chats", { targetUserId: room.targetUserId }],
    });
    queryClient.invalidateQueries({
      queryKey: ["rooms", { userId: room.targetUserId }],
    });
    queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
  };
  return (
    <Link
      onClick={handleClickReloadChat}
      href={`/chats?showChatUserId=${room.targetUserId}`}
      className="flex flex-col h-full"
    >
      <span className={`${isActived && "font-bold"}`}>
        {room.userProfile.nickname}
      </span>
      <span className="text-xs">
        {room.userProfile.role === "recipient" ? "후원아동" : "후원자"}
      </span>
    </Link>
  );
}

export default RoomItem;
