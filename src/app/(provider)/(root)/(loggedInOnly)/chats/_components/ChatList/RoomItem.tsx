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
  return (
    <Link
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
