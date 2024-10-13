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

const isStoreOwnerByUserId = async (userId: string | null) => {
  if (!userId) return null;
  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("sponsorId", userId);
  if (error) throw new Error(error.message);

  if (data.length === 0) return false;
  return true;
};
const isStoreOwnerByStoreId = async ({ storeId }: { storeId: string }) => {
  if (!storeId) return;

  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("storeId", storeId);
  if (error) throw new Error(error.message);

  if (data.length === 0) return false;
  return true;
};

const storeOwnersAPI = {
  insertStoreOwner,
  isStoreOwnerByStoreId,
  isStoreOwnerByUserId,
};
export default storeOwnersAPI;
