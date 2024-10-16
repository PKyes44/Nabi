"use client";

import clientApi from "@/api/clientSide/api";
import { useQuery } from "@tanstack/react-query";
import FreeMeal from "./FreeMeal";

function FreeMeals() {
  const { data: freeMeals } = useQuery({
    queryKey: ["freeMeals"],
    queryFn: () => clientApi.freeMeals.getFreeMealsWithStoreData(),
  });

  return (
    <ul className="flex flex-col gap-y-5">
      {freeMeals?.map((freeMeal) => {
        return (
          <li key={freeMeal.mealId}>
            <FreeMeal freeMeal={freeMeal} />
          </li>
        );
      })}
    </ul>
  );
}

export default FreeMeals;
