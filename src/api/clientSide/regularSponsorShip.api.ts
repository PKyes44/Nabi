import axios from "axios";

const serverClient = axios.create({ baseURL: "http://localhost:8080" });

const getBillingKey = async (requestData: {
  customerKey: string;
  authKey: string;
}) => {
  const response = await serverClient.post("/issue-billing-key", requestData);

  const data = response.data;
  return data;
};

const insertBillingKeyWithSponsorId = async () => {};

const regularSponsorShipAPI = { getBillingKey };

export default regularSponsorShipAPI;
