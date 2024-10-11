import authAPI from "./auth.api";
import profilesAPI from "./profiles.api";
import RecruitsAPI from "./recruits.api";
import storeDataAPI from "./storeData.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
  recruits: RecruitsAPI,
  storeData: storeDataAPI,
};

export default clientApi;
