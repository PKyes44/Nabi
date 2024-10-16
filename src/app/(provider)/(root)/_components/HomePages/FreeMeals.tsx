"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

function FreeMeals() {
  const router = useRouter();
  const { data: freeMeals } = useQuery({
    queryKey: ["freeMeals"],
    queryFn: () => clientApi.freeMeals.getFreeMealsWithStoreData(),
  });

  const handleClickLinkToStoreMap = (lat: number, lng: number) => {
    router.push(`/free-meals/map?lat=${lat}&lng=${lng}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold text-base text-center mx-auto">
        익명의 후원자가 무상식사를 제공합니다
      </h2>
      <ul className="flex flex-col gap-y-5">
        {freeMeals?.map((freeMeal) => {
          return (
            <li key={freeMeal.mealId}>
              <article className="bg-white p-5 flex flex-col gap-y-2 shadow-sm">
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
                      freeMeal.storeDatas?.lat!,
                      freeMeal.storeDatas?.lng!
                    )
                  }
                />
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FreeMeals;
