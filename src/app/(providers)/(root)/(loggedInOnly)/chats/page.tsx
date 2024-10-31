"use client";

import Container from "@/components/Container/Container";
import useWindowSize from "@/components/Hooks/WindowSize.hooks";
import { useSearchParams } from "next/navigation";
import DefaultChat from "./_components/DefaultScreen/DefaultScreen";
import MobileChat from "./_components/Mobile/MobileChat";

function ChatPage() {
  const windowSize = useWindowSize();

  const searchParams = useSearchParams();
  const showChatUserId = searchParams.get("showChatUserId");

  return (
    <Container width="lg" isMain className="pt-5">
      {windowSize.width > 360 ? (
        <DefaultChat showChatUserId={showChatUserId} />
      ) : (
        <MobileChat showChatUserId={showChatUserId} />
      )}
    </Container>
  );
}

export default ChatPage;
