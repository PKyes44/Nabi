/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import dayjs from "dayjs";
import Image from "next/image";

interface ReplyProps {
  reply: Tables<"replies"> & {
    userProfiles: Tables<"userProfiles">;
  };
}

function Reply({ reply }: ReplyProps) {
  const createdAt =
    Math.abs(dayjs(reply.createdAt).diff(dayjs(), "hours")) !== 0
      ? Math.abs(dayjs(reply.createdAt).diff(dayjs(), "hours")) + "시간 전"
      : Math.abs(dayjs(reply.createdAt).diff(dayjs(), "minutes")) + "분 전";

  return (
    <div className="flex items-start gap-x-3">
      <Image
        width={100}
        height={100}
        src={
          reply.userProfiles?.profileImageUrl ||
          "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png"
        }
        alt=""
        className="w-7 aspect-square object-cover rounded-full"
      />
      <article className="w-full n bg-[#f5f5f5] rounded-lg py-3 px-4 flex justify-between">
        <div className="flex flex-col gap-y-2">
          <span className="font-medium text-sm">
            {reply.userProfiles.nickname}
          </span>
          <p className="text-xs">{reply.content}</p>
        </div>
        <span className="font-light text-[9px] whitespace-nowrap">
          {createdAt}
        </span>
      </article>
    </div>
  );
}

export default Reply;
