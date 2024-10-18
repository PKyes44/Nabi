import { Tables } from "@/supabase/database.types";
import dayjs from "dayjs";
import LinkToStoreMapButton from "./LinkToStoreMapButton";

interface FreeMealProps {
  freeMeal: Tables<"freeMeals"> & {
    storeDatas: Tables<"storeDatas">;
  } & {
    userProfiles: Tables<"userProfiles">;
  };
}

function FreeMeal({ freeMeal }: FreeMealProps) {
  return (
    <article className="bg-white p-5 flex flex-col gap-y-5 shadow-sm">
      <div>
        <span className="font-bold">
          {freeMeal.userProfiles?.nickname}
          <span className="font-normal">
            님께서
            <br />
            당신에게 무상식사를 제공합니다 !
          </span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xs">매장명</span>
        <span className="not-italic text-sm">
          {freeMeal.storeDatas?.brandName}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xs">매장 주소</span>
        <address className="not-italic text-sm">
          {freeMeal.storeDatas?.address}
        </address>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xs">일시</span>
        <address className="not-italic text-sm">
          {dayjs(freeMeal.freeMealDate).format("YYYY-MM-DD HH:mm")}
        </address>
      </div>
      <LinkToStoreMapButton storeDatas={freeMeal.storeDatas!} />
    </article>
  );
}

export default FreeMeal;
