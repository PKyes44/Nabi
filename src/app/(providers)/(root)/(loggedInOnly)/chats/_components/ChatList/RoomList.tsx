"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import RoomItem from "./RoomItem";

interface RoomListProps {
  showChatUserId: string;
}

function RoomList({ showChatUserId }: RoomListProps) {
  const user = useAuthStore((state) => state.currentUser);

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () =>
      clientApi.rooms.getRoomsWithTargetUserByUserId(user?.userId!),
  });

  if (isLoading) return <span>채팅방 불러오는 중 ..</span>;

  return (
    <ul className="flex flex-col gap-y-1 max-w-64 w-full bg-white rounded-md shadow-md">
      {rooms!.map((room) => {
        const isActived = showChatUserId === room.targetUserId;
        return (
          <li
            key={room.roomId}
            className={` px-5 py-4 ${
              isActived && "bg-yellow-400 bg-opacity-25"
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
