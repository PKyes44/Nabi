import authAPI from "./auth.api";
import profilesAPI from "./profiles.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
};

export default clientApi;
