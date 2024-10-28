import { Tables } from "@/supabase/database.types";
import dayjs from "dayjs";
import Link from "next/link";
import LinkToStoreMapButton from "./LinkToStoreMapButton";

interface FreeMealProps {
  freeMeal: Tables<"freeMeals"> & {
    storeDatas: Tables<"storeDatas">;
  } & {
    userProfiles: Tables<"userProfiles">;
  };
}

function FreeMeal({ freeMeal }: FreeMealProps) {
  const sponsor = freeMeal.userProfiles;
  const store = freeMeal.storeDatas;
  const date = freeMeal.freeMealDate;

  return (
    <article className="bg-white py-4 flex flex-col gap-y-3 border-t group-last-of-type/free-meal-li:pb-0">
      <div className="flex flex-col">
        <span className="font-bold text-xs">후원자</span>
        <Link href={`/profiles/${sponsor.userId}`} className="text-xs">
          {sponsor.nickname}
        </Link>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-xs">매장명</span>
        <span className="not-italic text-xs">{store.brandName}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-xs">매장 주소</span>
        <address className="not-italic text-xs">{store.address}</address>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-xs">일시</span>
        <address className="not-italic text-xs">
          {dayjs(date).format("YYYY-MM-DD HH:mm")}
        </address>
      </div>

      <LinkToStoreMapButton store={store} />
    </article>
  );
}

export default FreeMeal;
