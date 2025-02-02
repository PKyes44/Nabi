/* eslint-disable @next/next/no-img-element */
import { Tables } from "@/supabase/database.types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

import Image from "next/image";

interface ReplyProps {
  reply: Tables<"replies"> & {
    userProfiles: Tables<"userProfiles">;
  };
}

const DEFAULT_PROFILE_IMG =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/ProfileDefault.png";

function Reply({ reply }: ReplyProps) {
  const createdAt = dayjs(reply.createdAt).fromNow();

  return (
    <div className="flex items-start gap-x-3">
      <Image
        width={100}
        height={100}
        src={reply.userProfiles?.profileImageUrl || DEFAULT_PROFILE_IMG}
        alt=""
        className="w-7 aspect-square object-cover rounded-full"
      />
      <article className="w-full bg-white border rounded-md px-4 py-3 flex justify-between">
        <div className="flex flex-col gap-y-2 sm:gap-y-1">
          <span className="font-semibold text-xs">
            {reply.userProfiles.nickname}
          </span>
          <p className="text-sm sm:text-xs">{reply.content}</p>
        </div>

        <span className="text-gray-400 text-xs whitespace-nowrap sm:text-[9px]">
          {createdAt}
        </span>
      </article>
    </div>
  );
}

export default Reply;
