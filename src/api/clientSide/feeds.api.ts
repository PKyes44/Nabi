import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import { Feeds } from "@/types/feeds.types";
import { RecruitItem } from "@/types/recruits.types";
import dayjs from "dayjs";

const getFeedsByUserId = async (userId: string, page: number) => {
  let query =
    "*, userProfiles(*), replies!replies_recruitId_fkey(*,userProfiles!replies_recipientId_fkey(*))";
  const { data: myRecruits, error: recruitError } = await supabase
    .from("recruits")
    .select(query)
    .eq("authorId", userId)
    .order("createdAt", { ascending: false })
    .range(page * 5, page * 5 + 4)
    .returns<RecruitItem[]>();

  if (recruitError) throw new Error(recruitError.message);

  query =
    "*, storeDatas!freeMeals_storeId_fkey(*), userProfiles!freeMeals_sponsorId_fkey(*)";
  const { data: myFreeMeals, error: freeMealError } = await supabase
    .from("freeMeals")
    .select(query)
    .eq("sponsorId", userId)
    .order("createdAt", { ascending: false })
    .range(page * 5, page * 5 + 4)
    .returns<
      Tables<"freeMeals"> & {
        storeDatas: Tables<"storeDatas">;
      } & {
          userProfiles: Tables<"userProfiles">;
        }[]
    >();

  if (freeMealError) throw new Error(freeMealError.message);

  query =
    "recruits(*, userProfiles(*), replies!replies_recruitId_fkey(*,userProfiles!replies_recipientId_fkey(*)))";
  const { data: participatedRecruits, error: participatedRecruitsError } =
    await supabase
      .from("recipientMeets")
      .select(query)
      .eq("status", "approved")
      .eq("userId", userId)
      .order("createdAt", { ascending: false })
      .range(page * 5, page * 5 + 4)
      .returns<
        {
          recruits: RecruitItem[];
        }[]
      >();

  if (participatedRecruitsError)
    throw new Error(participatedRecruitsError.message);

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

  const participatedRecruitList = participatedRecruits.map(
    (participatedRecruit) => {
      return {
        feedId: crypto.randomUUID(),
        type: "recruit",
        feed: participatedRecruit.recruits,
      };
    }
  );

  const result: Feeds = [
    ...myFreeMealList,
    ...myRecruitList,
    ...participatedRecruitList,
  ] as Feeds;

  const sortedResult = bubbleSort(result);
  return sortedResult;
};

const bubbleSort = (arr: Feeds) => {
  const newArr = arr;
  for (let x = 0; x < newArr.length; x++) {
    for (let y = 1; y < newArr.length - x; y++) {
      if (
        dayjs(newArr[y].feed.createdAt).isAfter(newArr[y - 1].feed.createdAt)
      ) {
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
