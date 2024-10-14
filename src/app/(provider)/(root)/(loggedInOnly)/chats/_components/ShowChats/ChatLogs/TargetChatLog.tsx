import { Tables } from "@/supabase/database.types";

interface TargetChatLogProps {
  chatLog: Tables<"chats">;
  userProfile: Tables<"userProfiles">;
}

function TargetChatLog({ chatLog, userProfile }: TargetChatLogProps) {
  return (
    <div className="w-full flex flex-col items-start justify-end">
      <span>{userProfile.nickname}</span>
      <span className="py-1.5 px-4 rounded-lg bg-gray-400">
        {chatLog.content}
      </span>
    </div>
  );
}

export default TargetChatLog;
