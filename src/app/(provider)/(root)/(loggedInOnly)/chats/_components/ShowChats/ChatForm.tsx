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
}

function ChatForm({ targetUserId, userId, roomId }: ChatFormProps) {
  const queryClient = useQueryClient();
  const handleSubmitChat: ComponentProps<"form">["onSubmit"] = (
    e: ChatFormEvent
  ) => {
    e.preventDefault();

    const msg = e.target.message.value;

    if (msg.length === 0) return;
    if (!roomId) {
      return console.log("roomId is null : ", roomId);
    }

    socket.emit(
      "newMessage",
      msg,
      { to: targetUserId, from: userId },
      roomId,
      () =>
        queryClient.invalidateQueries({
          queryKey: ["chats", { targetUserId }],
        })
    );

    e.target.message.value = "";
  };

  return (
    <form
      onSubmit={handleSubmitChat}
      className="absolute bottom-0 left-0 w-full  flex"
    >
      <input
        className="grow bg-transparent py-2 px-5 outline-none border-t border-black border-r"
        type="text"
        name="message"
      />
      <button
        type="submit"
        className="min-w-24 bg-yellow-300 bg-opacity-45 text-yellow-500 font-bold"
      >
        전송
      </button>
    </form>
  );
}

export default ChatForm;
