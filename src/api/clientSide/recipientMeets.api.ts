import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const getRecipientMeets = async () => {
  const { data } = await supabase.from("recipientMeets").select("*");
  return data;
};

const insertRecipientMeets = async (
  data: Database["public"]["Tables"]["recipientMeets"]["Insert"]
) => {
  const { error } = await supabase.from("recipientMeets").insert(data);

  if (error) {
    throw new Error(error.message);
  }
};

const recipientMeetsAPI = {
  getRecipientMeets,
  insertRecipientMeets,
};

export default recipientMeetsAPI;
