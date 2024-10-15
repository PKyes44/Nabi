"use client";

import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import ReplyList from "./ReplyList";

type RepliesProps = {
  recruitId: string;
};

function Replies({ recruitId }: RepliesProps) {
  const { data: replies } = useQuery({
    queryKey: ["replies", { recruitId }],
    queryFn: () => clientApi.replies.getRepliesByRecruitId(recruitId),
  });

  return replies ? (
    replies.length !== 0 ? (
      <>
        <ReplyList replies={replies} />
      </>
    ) : (
      <p className="text-black/30">댓글이 존재하지 않습니다</p>
    )
  ) : null;
}

export default Replies;
