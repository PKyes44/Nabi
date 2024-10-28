"use client";

import Loading from "@/components/Loading/Loading";
import { Suspense } from "react";
import RoomList from "./ChatList/RoomList";
import ChatScreen from "./ShowChats/ChatScreen";

interface ChatsProps {
  showChatUserId: string;
}

function Chats({ showChatUserId }: ChatsProps) {
  return (
    <div className="flex pt-10 gap-x-2 w-full">
      <Suspense fallback={<Loading />}>
        <RoomList showChatUserId={showChatUserId} />
        <ChatScreen showChatUserId={showChatUserId} />
      </Suspense>
    </div>
  );
}

export default Chats;
