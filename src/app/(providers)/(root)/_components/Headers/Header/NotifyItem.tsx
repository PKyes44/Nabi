"use client";

import { Notify } from "@/types/notify.types";
import { useModalStore } from "@/zustand/modal.store";
import dayjs from "dayjs";
import Link from "next/link";

interface NotifyItemProps {
  notify: Notify;
}

function NotifyItem({ notify }: NotifyItemProps) {
  useModalStore();

  let notifiedAt =
    Math.abs(dayjs(notify.notifiedAt).diff(dayjs(), "days")) + "일 전";
  if (+notifiedAt.split("일 전")[0] === 0)
    notifiedAt =
      Math.abs(dayjs(notify.notifiedAt).diff(dayjs(), "hours")) + "시간 전";
  if (
    +notifiedAt.split("시간 전")[0] === 0 ||
    +notifiedAt.split("일 전")[0] === 0
  )
    notifiedAt =
      Math.abs(dayjs(notify.notifiedAt).diff(dayjs(), "minutes")) + "분 전";

  return (
    <Link className="bg-white flex flex-col py-2 px-3" href={notify.url}>
      <div className="flex justify-between">
        <h6 className="font-bold text-yellow-400">{notify.title}</h6>
        <time className="text-[10px] text-gray-500">{notifiedAt}</time>
      </div>
      <span className="text-sm">{notify.content}</span>
    </Link>
  );
}

export default NotifyItem;
