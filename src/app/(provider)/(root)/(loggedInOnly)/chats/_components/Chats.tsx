import ChatList from "./ChatList/ChatList";
import ChatLog from "./ChatLog";

interface ChatsProps {
  showChatUserId: string;
}

function Chats({ showChatUserId }: ChatsProps) {
  return (
    <>
      <ChatList showChatUserId={showChatUserId} />
      <ChatLog showChatUserId={showChatUserId} />
    </>
  );
}

export default Chats;
