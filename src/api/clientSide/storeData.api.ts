import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";
import { LatLng } from "@/types/address.types";

const getStoreDatasBySwLatLngAndNeLatLng = async ({
  swLatLng,
  neLatLng,
}: {
  swLatLng: LatLng;
  neLatLng: LatLng;
}) => {
  const { error, data } = await supabase
    .from("storeDatas")
    .select()
    .gte("lat", swLatLng.Ma)
    .gte("lng", swLatLng.La)
    .lte("lat", neLatLng.Ma)
    .lte("lng", neLatLng.La);
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
  getStoreDatasBySwLatLngAndNeLatLng,
  updateStoreData,
};

export default storeDataAPI;
