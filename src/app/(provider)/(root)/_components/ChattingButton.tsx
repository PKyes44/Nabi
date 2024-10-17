"use client";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

interface ChattingButtonProps {
  showUserId: string;
}

function ChattingButton({ showUserId }: ChattingButtonProps) {
  const router = useRouter();

  const handleClickLinkToChat = () => {
    router.push(`/chats?showChatUserId=${showUserId}`);
  };

  return (
    <Button
      intent="primary"
      textIntent="primary"
      onClick={handleClickLinkToChat}
      className="px-5 py-1.5 rounded-sm text-base font-bold"
    >
      채팅하기
    </Button>
  );
}

export default ChattingButton;
