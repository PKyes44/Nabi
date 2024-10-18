import { supabase } from "@/supabase/client";

const getSponsorShipBySponsorShipId = async (sponsorShipId: string) => {
  const { data, error } = await supabase
    .from("sponsorShip")
    .select()
    .eq("sponsorShipId", sponsorShipId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

const sponsorShipAPI = {
  getSponsorShipBySponsorShipId,
};

export default sponsorShipAPI;
