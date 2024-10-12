import { supabase } from "@/supabase/client";
import { UserInfo } from "@/types/auth.types";

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

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data.user;
};

const authAPI = {
  signUp,
  logIn,
  getUser,
};

export default authAPI;
