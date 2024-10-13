import authAPI from "./auth.api";
import profilesAPI from "./profiles.api";
import storeDataAPI from "./storeData.api";
import recruitsAPI from "./recruits.api";
import storageAPI from "./storage.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
  storeData: storeDataAPI,
  recruits: recruitsAPI,
  storage: storageAPI,
};

export default clientApi;
