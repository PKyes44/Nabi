import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";

const TABLE_PROFILES = "userProfiles";

const getProfilesFilterByRoleAndSponsorShipCount = async (
  role: "recipient" | "sponsor"
) => {
  const query = `*, sponsorShip!sponsorShip_recipientId_fkey(count)`;
  const { error, data } = await supabase
    .from(TABLE_PROFILES)
    .select(query)
    .eq("role", role)
    .returns<
      (Tables<"userProfiles"> & { sponsorShip: { count: number }[] })[]
    >();

  if (error) throw new Error(error.message);

  const orderedData: Omit<
    (Tables<"userProfiles"> & { sponsorShip: { count: number }[] })[],
    "sponsorShip"
  > = bubbleSort(data!);
  return orderedData;
};
const bubbleSort = (
  arr: (Tables<"userProfiles"> & { sponsorShip: { count: number }[] })[]
) => {
  const newArr = arr;
  for (let x = 0; x < newArr.length; x++) {
    for (let y = 1; y < newArr.length - x; y++) {
      if (newArr[y - 1].sponsorShip[0].count > newArr[y].sponsorShip[0].count) {
        [newArr[y - 1], newArr[y]] = [newArr[y], newArr[y - 1]];
      }
    }
  }

  return newArr;
};

const getProfileByUserId = async (userId: string) => {
  try {
    const response = await supabase
      .from(TABLE_PROFILES)
      .select()
      .eq("userId", userId)
      .single();

    const user = response.data;
    return user;
  } catch (e) {
    console.log(e);
  }
};

const profilesAPI = {
  getProfileByUserId,
  getProfilesFilterByRoleAndSponsorShipCount,
};
export default profilesAPI;
