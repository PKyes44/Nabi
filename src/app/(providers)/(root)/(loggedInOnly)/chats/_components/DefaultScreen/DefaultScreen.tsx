"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import RoomList from "../ChatList/RoomList";
import ChatScreen from "../ShowChats/ChatScreen";

interface ChatsProps {
  showChatUserId?: string;
}

function DefaultChat({ showChatUserId }: ChatsProps) {
  const user = useAuthStore((state) => state.currentUser);
  const { data: targetUserId } = useQuery({
    initialData: null,
    queryKey: ["rooms", { type: "getRecentlyUser" }],
    queryFn: () => clientApi.rooms.getRecentlyRoomByUserId(user!.userId),
    enabled: !showChatUserId,
  });

  return (
    <div className="flex gap-x-2 w-full">
      <RoomList
        showChatUserId={showChatUserId ? showChatUserId : targetUserId}
      />
      <ChatScreen
        showChatUserId={showChatUserId ? showChatUserId : targetUserId}
      />
    </div>
  );
}

export default DefaultChat;
