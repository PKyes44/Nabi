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

const getStoreByUserId = async (userId: string) => {
  const query = "*, storeDatas!storeOwners_storeId_fkey(address, brandName)";
  const { error, data } = await supabase
    .from("storeOwners")
    .select(query)
    .eq("sponsorId", userId);

  if (error) throw new Error(error.message);

  return data;
};

const checkIsStoreOwnerByUserId = async (userId: string | null) => {
  if (!userId) return null;
  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("sponsorId", userId);
  if (error) throw new Error(error.message);

  if (data.length === 0) return false;
  return true;
};

const checkIsStoreOwnerByStoreId = async ({ storeId }: { storeId: string }) => {
  if (!storeId) return;

  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("storeId", storeId);
  if (error) throw new Error(error.message);

  if (data.length === 0) return false;
  return true;
};

const checkIsStoreOwnerByStoreIdAndUserId = async ({
  storeId,
  userId,
}: {
  storeId: string;
  userId: string;
}) => {
  if (!storeId) return;

  const { error, data } = await supabase
    .from("storeOwners")
    .select()
    .eq("storeId", storeId)
    .eq("sponsorId", userId);
  if (error) throw new Error(error.message);

  if (data.length === 0) return false;
  return true;
};

const deleteStoreOwnerByStoreId = async (storeId: string) => {
  await supabase.from("storeOwners").delete().eq("storeId", storeId);
};

const storeOwnersAPI = {
  deleteStoreOwnerByStoreId,
  checkIsStoreOwnerByStoreIdAndUserId,
  insertStoreOwner,
  getStoreByUserId,
  checkIsStoreOwnerByStoreId,
  checkIsStoreOwnerByUserId,
};
export default storeOwnersAPI;
