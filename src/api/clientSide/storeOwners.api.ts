import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const insertStoreOwner = async (
  insertOwner: Database["public"]["Tables"]["storeOwners"]["Insert"]
) => {
  const { error, data } = await supabase
    .from("storeOwners")
    .insert(insertOwner);
  if (error) throw new Error(error.message);

  return data;
};

const isStoreOwnerByUserId = async (userId: string) => {
  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("sponsorId", userId);
  if (error) throw new Error(error.message);

  console.log(data);
  // return data;
};
const isStoreOwnerByStoreIdAndUserId = async ({
  storeId,
  userId,
}: {
  storeId: string;
  userId: string;
}) => {
  if (!storeId || !userId) return;

  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("storeId", storeId)
    .eq("sponsorId", userId);
  if (error) throw new Error(error.message);

  console.log(data);
  return data;
};

const storeOwnersAPI = {
  insertStoreOwner,
  isStoreOwnerByStoreIdAndUserId,
  isStoreOwnerByUserId,
};
export default storeOwnersAPI;
