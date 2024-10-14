"use client";

import { Tables } from "@/supabase/database.types";
import MyChatLog from "./MyChatLog";
import TargetChatLog from "./TargetChatLog";

interface ChatLogsProps {
  chatLogs: Tables<"chats">[];
  targetProfile: Tables<"userProfiles">;
  userId: string;
}

function ChatLogs({ chatLogs, targetProfile, userId }: ChatLogsProps) {
  return (
    <ul
      id="chatLogs"
      className="py-5 flex flex-col gap-y-2 px-2 max-h-[339px] overflow-auto"
    >
      {chatLogs?.map((chatLog) => {
        const isMyChat = chatLog.from === userId;
        return (
          <li key={chatLog.chatId}>
            {isMyChat ? (
              <MyChatLog chatLog={chatLog} />
            ) : (
              <TargetChatLog chatLog={chatLog} userProfile={targetProfile!} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ChatLogs;
