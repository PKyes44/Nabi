import { supabase } from "@/supabase/client";
import { UserInfo } from "@/type/supabase";

const signUp = async (userInfo: UserInfo) => {
  const response = await supabase.auth.signUp(userInfo);
  return response;
};

const authAPI = {
  signUp,
};

export default authAPI;
