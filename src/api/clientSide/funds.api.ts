import { supabase } from "@/supabase/client";
import { serverClient } from "../backEndClient";

const paymentConfirm = async (requestData: {
  orderId: string;
  amount: string;
  paymentKey: string;
  domain: string;
}) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData) return;
  const userId = userData.user?.id;

  const { data } = await serverClient.post("/confirm", {
    ...requestData,
    userId,
  });

  return data;
};

const fundsAPI = { paymentConfirm };

export default fundsAPI;
