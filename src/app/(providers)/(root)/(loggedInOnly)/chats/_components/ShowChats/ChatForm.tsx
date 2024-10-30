import ButtonGroup from "@/components/Button/ButtonGroup";
import socket from "@/socket/socket";
import { CustomFormEvent } from "@/types/formEvent.types";
import { useQueryClient } from "@tanstack/react-query";
import { ComponentProps } from "react";

type ChatEvent = {
  message: HTMLInputElement;
};
type ChatFormEvent = CustomFormEvent<ChatEvent>;

interface ChatFormProps {
  targetUserId: string;
  userId: string;
  roomId: string;
  handlehandleScrollAtBottom: () => void;
}

function ChatForm({
  targetUserId,
  userId,
  roomId,
  handlehandleScrollAtBottom,
}: ChatFormProps) {
  const queryClient = useQueryClient();
  const handleSubmitChat: ComponentProps<"form">["onSubmit"] = (
    e: ChatFormEvent
  ) => {
    e.preventDefault();

    const msg = e.target.message.value;

    if (msg.length === 0) return;
    if (!roomId) return console.log("roomId is null : ", roomId);

    socket.emit(
      "newMessage",
      msg,
      { to: targetUserId, from: userId },
      roomId,
      () => {
        queryClient.invalidateQueries({
          queryKey: ["chats", { targetUserId }],
        });
        handlehandleScrollAtBottom();
      }
    );

    e.target.message.value = "";
  };

  return (
    <form
      onSubmit={handleSubmitChat}
      className="absolute bottom-0 left-0 w-full flex"
    >
      <input
        className="grow bg-transparent py-2 px-5 outline-none border-t border-gray-300 border-r"
        type="text"
        name="message"
      />
      <ButtonGroup
        value="전송"
        type="submit"
        intent="primary"
        textIntent="primary"
        size="xs"
        className="whitespace-nowrap h-full !text-sm sm:!px-4"
      />
    </form>
  );
}

export default ChatForm;
