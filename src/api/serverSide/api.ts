import freeMealsAPI from "./freeMeals.api";
import profilesAPI from "./profiles.api";
import recruitsAPI from "./recruits.api";
import repliesAPI from "./replies.api";

const serverApi = {
  profiles: profilesAPI,
  replies: repliesAPI,
  freeMeals: freeMealsAPI,
  recruits: recruitsAPI,
};
export default serverApi;
