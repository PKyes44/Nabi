/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import Image from "next/image";
import CreateRecruitsReply from "./CreateRecruitsReply";
import ReplyList from "./ReplyList";
import ThumbUpButton from "./ThumbUpButton";

type RepliesProps = {
  replies: (Tables<"replies"> & {
    userProfiles: Tables<"userProfiles">;
  })[];
  recruitId: string;
};

function Replies({ replies, recruitId }: RepliesProps) {
  return (
    <>
      <article className="mt-2">
        <div className="flex gap-x-3 items-center">
          <div className="flex gap-x-2 items-center">
            <Image
              width={100}
              height={100}
              className="w-4 aspect-square"
              src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Comments.png"
              alt="reply icon"
            />
            <span className="font-light text-xs">
              감사인사 ({replies?.length})
            </span>
          </div>
          <ThumbUpButton recruitId={recruitId} />
        </div>
        <CreateRecruitsReply recruitId={recruitId} />
        {replies ? (
          replies.length !== 0 ? (
            <ReplyList replies={replies} />
          ) : (
            <p className="text-black/30 mt-5">
              후원 받은 아동만 감사인사를 작성 할 수 있습니다
            </p>
          )
        ) : null}
      </article>
    </>
  );
}

export default Replies;
