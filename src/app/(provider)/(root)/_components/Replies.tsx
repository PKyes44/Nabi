"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import ReplyList from "./ReplyList";

type RepliesProps = {
  recruitId: string;
};

function Replies({ recruitId }: RepliesProps) {
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: replies } = useQuery({
    queryKey: ["replies", { recruitId }],
    queryFn: () => clientApi.reply.getRepliesByRecruitId(recruitId),
  });

  const { data: profile } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  return replies ? (
    replies.length !== 0 ? (
      <>
        <strong>댓글 목록</strong>
        <ReplyList nickname={profile?.nickname} replies={replies} />
      </>
    ) : (
      <p className="text-black/30">댓글이 존재하지 않습니다</p>
    )
  ) : null;
}

export default Replies;
