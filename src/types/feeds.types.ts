import { FreeMealItem } from "./freeMeals.types";
import { RecruitItem } from "./recruits.types";

type FeedType = "recruit" | "freeMeal";

export type Feed = { feedId: string; type: FeedType } & {
  feed: RecruitItem | FreeMealItem;
};

export type Feeds = Feed[];
