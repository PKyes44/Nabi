import authAPI from "./auth.api";
import profilesAPI from "./profiles.api";
import recruitsAPI from "./recruits.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
  recruits: recruitsAPI,
};

export default clientApi;
