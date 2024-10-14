import { supabase } from "@/supabase/client";

const TABLE_CHATS = "chats";

const getChatsByUserIdAndTargetUserId = async ({
  targetUserId,
  userId,
}: {
  targetUserId: string;
  userId: string;
}) => {
  const selectQuery = `and(from.eq.${targetUserId},to.eq.${userId}),and(from.eq.${userId},to.eq.${targetUserId})`;
  const { error, data } = await supabase
    .from(TABLE_CHATS)
    .select()
    .or(selectQuery);

  if (error) throw new Error(error.message);

  return data;
};

const chatsAPI = {
  getChatsByUserIdAndTargetUserId,
};
export default chatsAPI;
