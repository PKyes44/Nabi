import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const getStoreDatas = async () => {
  const { error, data } = await supabase.from("storeDatas").select();
  if (error) throw new Error(error.message);
  return data;
};
const updateStoreData = async (
  updateData: Database["public"]["Tables"]["storeDatas"]["Row"]
) => {
  const { error, data } = await supabase
    .from("storeDatas")
    .update(updateData)
    .eq("storeId", updateData.storeId);

  if (error) Error(error.message);

  return data;
};

const storeDataAPI = {
  getStoreDatas,
  updateStoreData,
};

export default storeDataAPI;
