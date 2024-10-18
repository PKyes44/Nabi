import serverApi from "@/api/serverSide/api";
import ButtonGroup from "@/components/Button/ButtonGroup";
import Link from "next/link";
import FreeMeal from "./FreeMeal";

async function FreeMeals() {
  const freeMeals = await serverApi.freeMeals.getFreeMealsWithStoreData();

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
