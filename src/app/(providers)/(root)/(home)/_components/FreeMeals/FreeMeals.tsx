"use client";

import clientApi from "@/api/clientSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { Tables } from "@/supabase/database.types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import FreeMeal from "./FreeMeal";

interface FreeMealsProps {
  initialFreeMeals: (Tables<"freeMeals"> & {
    storeDatas: Tables<"storeDatas">;
  } & {
    userProfiles: Tables<"userProfiles">;
  })[];
}

function FreeMeals({ initialFreeMeals }: FreeMealsProps) {
  const { data: freeMeals } = useQuery({
    initialData: initialFreeMeals,
    queryKey: ["freeMeals"],
    queryFn: () => clientApi.freeMeals.getFreeMealsWithStoreData(),
  });

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold text-base text-center mx-auto">
        익명의 후원자가 무상식사를 제공합니다
      </h2>
      <Link className="bg-white my-3" href="/free-meals/map">
        <ButtonGroup
          intent="primary"
          textIntent="primary"
          value="내 주변 무상식사 보기"
          className="w-full"
        />
      </Link>
      <ul className="flex flex-col gap-y-5">
        {freeMeals?.map((freeMeal) => {
          return (
            <li key={freeMeal.mealId}>
              <FreeMeal freeMeal={freeMeal} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FreeMeals;
