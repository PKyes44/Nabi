import { Tables } from "@/supabase/database.types";

interface MyChatLogProps {
  chatLog: Tables<"chats">;
}

function MyChatLog({ chatLog }: MyChatLogProps) {
  return (
    <div className="w-full flex flex-col items-end justify-end">
      <span className="py-1.5 px-4 rounded-lg bg-yellow-300">
        {chatLog.content}
      </span>
    </div>
  );
}

export default MyChatLog;
