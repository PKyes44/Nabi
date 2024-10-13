import RoomList from "./ChatList/RoomList";
import ChatScreen from "./ChatScreen";

interface ChatsProps {
  showChatUserId: string;
}

function Chats({ showChatUserId }: ChatsProps) {
  return (
    <div className="flex pt-10 gap-x-2 w-full">
      <RoomList showChatUserId={showChatUserId} />
      <ChatScreen showChatUserId={showChatUserId} />
    </div>
  );
}

export default Chats;
