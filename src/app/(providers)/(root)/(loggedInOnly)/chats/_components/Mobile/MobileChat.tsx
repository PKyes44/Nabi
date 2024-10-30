"use client";

import RoomList from "../ChatList/RoomList";
import ChatScreen from "../ShowChats/ChatScreen";

interface MobileChatProps {
  showChatUserId?: string;
}

function MobileChat({ showChatUserId }: MobileChatProps) {
  return showChatUserId ? (
    <ChatScreen showChatUserId={showChatUserId} />
  ) : (
    <RoomList />
  );
}

export default MobileChat;
