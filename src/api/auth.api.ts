import { supabase } from "@/supabase/client";
import { UserInfo } from "@/type/supabase";

const signUp = async (userInfo: UserInfo) => {
  const { error, data } = await supabase.auth.signUp(userInfo);
  if (error) throw new Error(error.message);

  return data;
};

const logIn = async (logInData: UserInfo) => {
  const { data, error } = await supabase.auth.signInWithPassword(logInData);
  if (error) throw new Error(error.message);

  return data;
};

const authAPI = {
  signUp,
  logIn,
};

export default authAPI;
