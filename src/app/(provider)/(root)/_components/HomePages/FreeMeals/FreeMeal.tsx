import ButtonGroup from "@/components/Button/ButtonGroup";
import { Tables } from "@/supabase/database.types";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface FreeMealProps {
  freeMeal: {
    createdAt: string;
    freeMealDate: string;
    maxServingCount: number;
    mealId: string;
    sponsorId: string;
    storeId: string;
    storeDatas: Tables<"storeDatas"> | null;
    userProfiles: Tables<"userProfiles"> | null;
  };
}

function FreeMeal({ freeMeal }: FreeMealProps) {
  const router = useRouter();
  const handleClickLinkToStoreMap = (lat: number, lng: number) => {
    router.push(`/free-meals/map?lat=${lat}&lng=${lng}`);
  };

  return (
    <article className="bg-white p-5 flex flex-col gap-y-2">
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
      <ButtonGroup
        value="위치 보기"
        intent="primary"
        textIntent="primary"
        className="w-full"
        onClick={() =>
          handleClickLinkToStoreMap(
            freeMeal.storeDatas!.lat,
            freeMeal.storeDatas!.lng
          )
        }
      />
    </article>
  );
}

export default FreeMeal;
