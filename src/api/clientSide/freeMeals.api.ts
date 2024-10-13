import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const TABLE_FREE_MEALS = "freeMeals";

const insertFreeMeals = async (
  insertData: Database["public"]["Tables"]["freeMeals"]["Insert"]
) => {
  const { error, data } = await supabase
    .from(TABLE_FREE_MEALS)
    .insert(insertData);
  if (error) throw new Error(error.message);

  console.log(data);
};

const freeMealsAPI = {
  insertFreeMeals,
};

export default freeMealsAPI;
