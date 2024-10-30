"use client";

import Container from "@/components/Container/Container";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import DesktopChat from "./_components/Desktop/DesktopChat";
import MobileChat from "./_components/Mobile/MobileChat";

interface ChatPageProps {
  searchParams: {
    showChatUserId: string;
  };
}

function ChatPage({ searchParams: { showChatUserId } }: ChatPageProps) {
  const windowSize = useWindowSize();

  return (
    <Container width="lg" isMain className="pt-5">
      {windowSize.width <= 360 ? (
        <MobileChat showChatUserId={showChatUserId} />
      ) : (
        <DesktopChat showChatUserId={showChatUserId} />
      )}
    </Container>
  );
}

export default ChatPage;
