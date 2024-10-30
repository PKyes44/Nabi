import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
const TABLE_FREE_MEALS = "freeMeals";

const getFreeMealsWithStoreData = async () => {
  try {
    const query =
      "*, storeDatas!freeMeals_storeId_fkey(*), userProfiles!freeMeals_sponsorId_fkey(*)";
    const { error, data } = await supabase
      .from(TABLE_FREE_MEALS)
      .select(query)
      .order("createdAt", { ascending: false })
      .limit(3)
      .returns<
        (Tables<"freeMeals"> & {
          storeDatas: Tables<"storeDatas">;
        } & {
          userProfiles: Tables<"userProfiles">;
        })[]
      >();
    if (error) throw new Error(error.message);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const freeMealsAPI = {
  getFreeMealsWithStoreData,
};

export default freeMealsAPI;
