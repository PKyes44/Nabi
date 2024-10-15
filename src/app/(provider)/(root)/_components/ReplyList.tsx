import { Tables } from "@/supabase/database.types";

interface ReplyListProps {
  replies: Tables<"replies">[];
  nickname?: string;
}

function ReplyList({ nickname, replies }: ReplyListProps) {
  return (
    <ul className="mt-5">
      {replies.map((reply) => (
        <li key={reply.replyId}>
          <p>
            {nickname} : {reply.content}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ReplyList;
