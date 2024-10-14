import { supabase } from "@/supabase/client";
import { FreeMeals } from "@/types/customDatabase";

const TABLE_FREE_MEALS = "freeMeals";

const insertFreeMeals = async (insertData: FreeMeals["Insert"]) => {
  const { error, data } = await supabase
    .from(TABLE_FREE_MEALS)
    .insert(insertData);
  if (error) throw new Error(error.message);

  console.log(data);
};

const getFreeMealsWithStoreData = async () => {
  const query =
    "*, storeDatas!freeMeals_storeId_fkey(*), userProfiles!freeMeals_sponsorId_fkey(*)";
  const { error, data } = await supabase.from(TABLE_FREE_MEALS).select(query);
  if (error) throw new Error(error.message);
  console.log("data", data);
  return data;
};

const freeMealsAPI = {
  insertFreeMeals,
  getFreeMealsWithStoreData,
};

export default freeMealsAPI;
