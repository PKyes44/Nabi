"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import RoomItem from "./RoomItem";

interface RoomListProps {
  showChatUserId: string;
}

function RoomList({ showChatUserId }: RoomListProps) {
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => clientApi.rooms.getRoomsWithTargetUserByUserId(userId!),
  });

  if (isLoading) return <span>채팅방 불러오는 중 ..</span>;

  return (
    <ul className="flex flex-col gap-y-1 max-w-64 w-full">
      {rooms!.map((room) => {
        const isActived = showChatUserId === room.targetUserId;
        return (
          <li
            key={room.roomId}
            className={`border border-black px-3 py-2 ${
              isActived && "bg-black bg-opacity-5"
            }`}
          >
            <RoomItem room={room} isActived={isActived} />
          </li>
        );
      })}
    </ul>
  );
}

export default RoomList;
