import Page from "@/components/Page/Page";
import Chats from "./_components/Chats";

interface ChatPageProps {
  searchParams: {
    showChatUserId: string;
  };
}

function ChatPage({ searchParams: { showChatUserId } }: ChatPageProps) {
  return (
    <Page isMain>
      <Chats showChatUserId={showChatUserId} />
    </Page>
  );
}

export default ChatPage;
