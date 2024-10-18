import Container from "@/components/Container/Container";
import Chats from "./_components/Chats";

interface ChatPageProps {
  searchParams: {
    showChatUserId: string;
  };
}

function ChatPage({ searchParams: { showChatUserId } }: ChatPageProps) {
  return (
    <Container width="lg" isMain>
      <Chats showChatUserId={showChatUserId} />
    </Container>
  );
}

export default ChatPage;
