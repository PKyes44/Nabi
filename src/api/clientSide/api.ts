import authAPI from "./auth.api";
import profilesAPI from "./profiles.api";
import RecruitsAPI from "./recruits.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
  recruits: RecruitsAPI,
};

export default clientApi;
