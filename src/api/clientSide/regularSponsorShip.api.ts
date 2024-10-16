import axios from "axios";

const serverClient = axios.create({
  baseURL: "https://port-0-nabi-backend-m29e62geab88e174.sel4.cloudtype.app/",
});

const getBillingKey = async (requestData: {
  customerKey: string;
  authKey: string;
  price: number;
  recipientId: string;
}) => {
  const response = await serverClient.post("/issue-billing-key", requestData);

  const data = response.data;
  return data;
};

const regularSponsorShipAPI = {
  getBillingKey,
};

export default regularSponsorShipAPI;
