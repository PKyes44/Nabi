import { useNotifyStore } from "@/zustand/notify.store";
import NotifyItem from "./NotifyItem";

function NotifyList() {
  const notifyList = useNotifyStore((state) => state.notifyList);

  return (
    <ul>
      {notifyList.map((notify) => (
        <li>
          <NotifyItem notify={notify} />
        </li>
      ))}
    </ul>
  );
}

export default NotifyList;
