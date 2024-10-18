import { Notify } from "@/types/notify.types";
import Link from "next/link";

interface NotifyItemProps {
  notify: Notify;
}

function NotifyItem({ notify }: NotifyItemProps) {
  return (
    <Link className="bg-white border border-black" href={notify.url}>
      <h6>{notify.title}</h6>
      <span>{notify.content}</span>
      <time>{notify.notifiedAt}</time>
    </Link>
  );
}

export default NotifyItem;
