import authAPI from "./auth.api";
import chatsAPI from "./chats.api";
import freeMealsAPI from "./freeMeals.api";
import profilesAPI from "./profiles.api";
<<<<<<< HEAD
import recipientsMeetsAPI from "./recipientsMeets.api";
=======
import recipientMeetsAPI from "./recipientMeets.api";
>>>>>>> develop
import recruitsAPI from "./recruits.api";
import regularSponsorShipAPI from "./regularSponsorShip.api";
import repliesAPI from "./replies.api";
import roomsAPI from "./rooms.api";
import sponsorMeetsAPI from "./sponsorMeets.api";
import sponsorShipAPI from "./sponsorShip.api";
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
  regularSponsorShip: regularSponsorShipAPI,
  sponsorShip: sponsorShipAPI,
  freeMeals: freeMealsAPI,
  rooms: roomsAPI,
  chats: chatsAPI,
  replies: repliesAPI,
  sponsorMeets: sponsorMeetsAPI,
<<<<<<< HEAD
  recipientMeets: recipientsMeetsAPI,
=======
  recipientMeets: recipientMeetsAPI,
>>>>>>> develop
};

export default clientApi;
