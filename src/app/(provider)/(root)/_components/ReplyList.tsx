import { Tables } from "@/supabase/database.types";
import Reply from "./Reply";

interface ReplyListProps {
  replies: Tables<"replies">[];
}

function ReplyList({ replies }: ReplyListProps) {
  return (
    <ul className="mt-5">
      {replies.map((reply) => (
        <li key={reply.replyId}>
          <Reply reply={reply} />
        </li>
      ))}
    </ul>
  );
}

export default ReplyList;
