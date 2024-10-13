import Page from "@/components/Page/Page";
import Chats from "./_components/Chats";

interface ChatPageProps {
  searchParams: {
    showChatUserId: string;
  };
}

function ChatPage({ searchParams: { showChatUserId } }: ChatPageProps) {
  return (
    <Page width="lg" isMain>
      <Chats showChatUserId={showChatUserId} />
    </Page>
  );
}

export default ChatPage;
