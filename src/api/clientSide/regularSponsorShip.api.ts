import { supabase } from "@/supabase/client";
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

const getMyRegularSponsorships = async (userId: string) => {
  const { data: myRegularSponsorships } = await supabase
    .from("regularSponsorship")
    .select("*")
    .eq("sponsorId", userId);
  return myRegularSponsorships;
};

const addRegularSponsorship = async (data: {
  sponsorId: string;
  recipientId: string;
}) => {
  await supabase.from("regularSponsorship").insert(data);
};

const stopRegularSponsorship = async (userId: string, recipientId: string) => {
  await supabase
    .from("regularSponsorship")
    .delete()
    .eq("recipientId", recipientId)
    .eq("sponsorId", userId);
};

const regularSponsorShipAPI = {
  getBillingKey,
  getMyRegularSponsorships,
  addRegularSponsorship,
  stopRegularSponsorship,
};

export default regularSponsorShipAPI;
