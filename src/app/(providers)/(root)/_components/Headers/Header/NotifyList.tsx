import { useNotifyStore } from "@/zustand/notify.store";
import NotifyItem from "./NotifyItem";

function NotifyList() {
  const notifyList = useNotifyStore((state) => state.notifyList);

  return (
    <ul className="px-2 py-2 border border-black rounded-lg bg-white w-80 flex flex-col gap-y-1 fixed top-16 right-28">
      {notifyList.length !== 0 &&
        notifyList.map((notify, index) => (
          <li key={index}>
            <NotifyItem notify={notify} />
            {index !== notifyList.length - 1 && (
              <hr className="border-[0.1px] border-black" />
            )}
          </li>
        ))}
      {notifyList.length === 0 && (
        <span className="mx-auto">알림이 없습니다</span>
      )}
    </ul>
  );
}

export default NotifyList;
