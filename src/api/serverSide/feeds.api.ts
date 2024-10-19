import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import { Feeds } from "@/types/feeds.types";
import dayjs from "dayjs";

const getFeedsByUserId = async (userId: string) => {
  try {
    let query =
      "*, userProfiles(*), replies!replies_recruitId_fkey(*,userProfiles!replies_recipientId_fkey(*))";
    const { data: myRecruits, error: recruitError } = await supabase
      .from("recruits")
      .select(query)
      .eq("authorId", userId);

    if (recruitError) throw new Error(recruitError.message);

    query =
      "*, storeDatas!freeMeals_storeId_fkey(*), userProfiles!freeMeals_sponsorId_fkey(*)";
    const { data: myFreeMeals, error: freeMealError } = await supabase
      .from("freeMeals")
      .select(query)
      .eq("sponsorId", userId)
      .returns<
        Tables<"freeMeals"> & {
          storeDatas: Tables<"storeDatas">;
        } & {
            userProfiles: Tables<"userProfiles">;
          }[]
      >();

    if (freeMealError) throw new Error(freeMealError.message);

    const myRecruitList = myRecruits.map((recruit) => {
      return {
        feedId: crypto.randomUUID(),
        type: "recruit",
        feed: recruit,
      };
    });
    const myFreeMealList = myFreeMeals.map((freeMeal) => {
      return {
        feedId: crypto.randomUUID(),
        type: "freeMeal",
        feed: freeMeal,
      };
    });

    const result: Feeds = [...myFreeMealList, ...myRecruitList] as Feeds;

    const sortedResult = bubbleSort(result);
    return sortedResult;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const bubbleSort = (arr: Feeds) => {
  const newArr = arr;
  for (let x = 0; x < newArr.length; x++) {
    for (let y = 1; y < newArr.length - x; y++) {
      if (dayjs(newArr[y - 1].feed.createdAt).diff(newArr[y].feed.createdAt)) {
        [newArr[y - 1], newArr[y]] = [newArr[y], newArr[y - 1]];
      }
    }
  }

  return newArr;
};

const feedsAPI = {
  getFeedsByUserId,
};

export default feedsAPI;
