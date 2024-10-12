import authAPI from "./auth.api";
import profilesAPI from "./profiles.api";
import storeDataAPI from "./storeData.api";
import recruitsAPI from "./recruits.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
  storeData: storeDataAPI,
  recruits: recruitsAPI,
};

export default clientApi;
