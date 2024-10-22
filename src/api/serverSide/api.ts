import feedsAPI from "./feeds.api";
import freeMealsAPI from "./freeMeals.api";
import profilesAPI from "./profiles.api";
import recipientMeetsAPI from "./recipientMeets.api";
import recruitsAPI from "./recruits.api";
import repliesAPI from "./replies.api";
import sponsorMeetsAPI from "./sponsorMeets.api";

const serverApi = {
  profiles: profilesAPI,
  replies: repliesAPI,
  freeMeals: freeMealsAPI,
  recruits: recruitsAPI,
  feeds: feedsAPI,
  recipinetMeets: recipientMeetsAPI,
  sponsorMeets: sponsorMeetsAPI,
};
export default serverApi;
