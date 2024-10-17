import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";

const getRecruits = async () => {
  try {
    const query = "*, userProfiles(*)";

    const { data, error } = await supabase
      .from("recruits")
      .select(query)
      .order("createdAt", { ascending: false })
      .returns<
        (Tables<"recruits"> & {
          userProfiles: Tables<"userProfiles">;
        })[]
      >();

    if (error) throw new Error(error.message);

    return data!;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const getRecruitsByUserId = async (userId: string) => {
  try {
    const query = "*, userProfiles(*)";

    const { data, error } = await supabase
      .from("recruits")
      .select(query)
      .eq("authorId", userId)
      .order("createdAt", { ascending: false })
      .returns<
        (Tables<"recruits"> & {
          userProfiles: Tables<"userProfiles">;
        })[]
      >();

    if (error) throw new Error(error.message);

    return data!;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getInfiniteRecruitsByUserId = async (page: number, userId: string) => {
  try {
    const query = "*, userProfiles(*)";

    const { data } = await supabase
      .from("recruits")
      .select(query)
      .eq("authorId", userId)
      .order("createdAt", { ascending: false })
      .range(page * 5, page * 5 + 4);

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getInfiniteRecruits = async (page: number) => {
  try {
    const query = "*, userProfiles(*)";
    const { data } = await supabase
      .from("recruits")
      .select(query)
      .order("createdAt", { ascending: false })
      .range(page * 5, page * 5 + 4);

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getGroupOfPageRecruits = async (page: number, offset: number) => {
  try {
    const from = page * offset;
    const to = page * offset + offset - 1;
    const query =
      "*, userProfiles(*), replies!replies_recruitId_fkey(*,userProfiles!replies_recipientId_fkey(*))";

    const { data, error } = await supabase
      .from("recruits")
      .select(query)
      .range(from, to)
      .order("createdAt", { ascending: false })
      .returns<
        (Tables<"recruits"> & {
          userProfiles: Tables<"userProfiles">;
        } & {
          replies: (Tables<"replies"> & {
            userProfiles: Tables<"userProfiles">;
          })[];
        })[]
      >();

    if (error) throw new Error(error.message);

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const recruitsAPI = {
  getInfiniteRecruitsByUserId,
  getInfiniteRecruits,
  getRecruits,
  getRecruitsByUserId,
  getGroupOfPageRecruits,
};

export default recruitsAPI;
