"use client";

import RoomList from "../ChatList/RoomList";
import ChatScreen from "../ShowChats/ChatScreen";

interface ChatsProps {
  showChatUserId: string;
}

function DesktopChat({ showChatUserId }: ChatsProps) {
  return (
    <div className="flex gap-x-2 w-full">
      <RoomList showChatUserId={showChatUserId} />
      <ChatScreen showChatUserId={showChatUserId} />
    </div>
  );
}

export default DesktopChat;
