"use client";

import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import CreateRecruitsReply from "./CreateRecruitsReply";
import ReplyList from "./ReplyList";

type RepliesProps = {
  recruitId: string;
};

function Replies({ recruitId }: RepliesProps) {
  const { data: replies } = useQuery({
    queryKey: ["replies", { recruitId }],
    queryFn: () => clientApi.replies.getRepliesByRecruitId(recruitId),
  });

  return (
    <>
      <article className="mt-2">
        <div className="flex gap-x-3 items-center">
          <div className="flex gap-x-2 items-center">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Comments.png"
              alt="comments icon"
            />
            <span className="font-light text-xs">댓글 ({replies?.length})</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <img
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ThumbsUp.png?t=2024-10-15T19%3A56%3A31.548Z"
              alt="thumbs up icon"
            />
            <span className="font-light text-xs">좋아요 (56)</span>
          </div>
        </div>
        <CreateRecruitsReply recruitId={recruitId} />
        {replies ? (
          replies.length !== 0 ? (
            <>
              <ReplyList replies={replies} />
            </>
          ) : (
            <p className="text-black/30 mt-5">댓글이 존재하지 않습니다</p>
          )
        ) : null}
      </article>
    </>
  );
}

export default Replies;
