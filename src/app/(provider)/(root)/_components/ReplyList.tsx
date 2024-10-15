import { Tables } from "@/supabase/database.types";
import Reply from "./Reply";

type ReplyResponse = (Tables<"replies"> & {
  userProfiles: Tables<"userProfiles">;
})[];

function ReplyList({ replies }: { replies: ReplyResponse }) {
  return (
    <ul className="mt-5 flex flex-col gap-y-3">
      {replies.map((reply) => (
        <li key={reply.replyId}>
          <Reply reply={reply} />
        </li>
      ))}
    </ul>
  );
}

export default ReplyList;
