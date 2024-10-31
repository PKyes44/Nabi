"use client";

import RoomList from "../ChatList/RoomList";
import ChatScreen from "../ShowChats/ChatScreen";

interface MobileChatProps {
  showChatUserId?: string | null;
}

function MobileChat({ showChatUserId }: MobileChatProps) {
  console.log("showChatUserId at mobile chat: ", showChatUserId);
  return showChatUserId ? (
    <ChatScreen showChatUserId={showChatUserId} />
  ) : (
    <RoomList />
  );
}

export default MobileChat;
