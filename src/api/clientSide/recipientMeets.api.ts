import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const getRecipientMeets = async () => {
  const response = await supabase.from("recipientMeets").select("*");
  const recruitIds = response.data;
  return recruitIds;
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
