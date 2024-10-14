"use client";

import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";

type RepliesProps = {
  recruitId: string;
};

function Replies({ recruitId }: RepliesProps) {
  const { data: replies } = useQuery({
    queryKey: ["replies", { recruitId }],
    queryFn: () => clientApi.reply.getRepliesByRecruitId(recruitId),
  });

  console.log(replies);

  return replies ? (
    replies.length !== 0 ? (
      <>
        <strong>댓글 목록</strong>
        <ul>
          {replies.map((reply) => (
            <li key={reply.replyId}>
              <p>도움받은 아이 : {reply.content}</p>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p>댓글이 존재하지 않습니다</p>
    )
  ) : null;
}

export default Replies;
