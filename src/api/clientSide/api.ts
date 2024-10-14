import authAPI from "./auth.api";
import chatsAPI from "./chats.api";
import freeMealsAPI from "./freeMeals.api";
import profilesAPI from "./profiles.api";
import recruitsAPI from "./recruits.api";
import regularSponsorShipAPI from "./regularSponsorShip.api";
import repliesAPI from "./replies.api";
import roomsAPI from "./rooms.api";
import storageAPI from "./storage.api";
import storeDataAPI from "./storeData.api";
import storeOwnersAPI from "./storeOwners.api";

const clientApi = {
  auth: authAPI,
  profiles: profilesAPI,
  storeData: storeDataAPI,
  recruits: recruitsAPI,
  storage: storageAPI,
  storeOwners: storeOwnersAPI,
  sponsorShip: regularSponsorShipAPI,
  freeMeal: freeMealsAPI,
  reply: repliesAPI,
  freeMeals: freeMealsAPI,
  rooms: roomsAPI,
  chats: chatsAPI,
};

export default clientApi;
