import { supabase } from "@/supabase/client";

const TABLE_ROOMS = "rooms";

const getRoomsWithTargetUserByUserId = async (userId: string) => {
  const selectQueryA = "*, userProfiles!rooms_userBId_fkey2(nickname, role)";
  const selectQueryB = "*, userProfiles!rooms_userAId_fkey2(nickname, role)";
  const userAPromise = supabase
    .from(TABLE_ROOMS)
    .select(selectQueryA)
    .eq("userAId", userId);
  const userBPromise = supabase
    .from(TABLE_ROOMS)
    .select(selectQueryB)
    .eq("userBId", userId);

  const [{ data: dataA }, { data: dataB }] = await Promise.all([
    userAPromise,
    userBPromise,
  ]);

  const result = [];
  if (dataA && dataA.length !== 0) {
    result.push(
      ...dataA.map((data) => {
        const userProfile = data.userProfiles as unknown as {
          nickname: string;
          role: string;
        };
        const nickname = userProfile.nickname;
        const role = userProfile.role;
        return {
          roomId: data.roomId,
          userId: data.userAId,
          targetUserId: data.userBId,
          userProfile: {
            nickname,
            role,
          },
        };
      })
    );
  }
  if (dataB && dataB.length !== 0) {
    result.push(
      ...dataB.map((data) => {
        const userProfile = data.userProfiles as unknown as {
          nickname: string;
          role: string;
        };
        const nickname = userProfile.nickname;
        const role = userProfile.role;
        return {
          roomId: data.roomId,
          userId: data.userBId,
          targetUserId: data.userAId,
          userProfile: {
            nickname,
            role,
          },
        };
      })
    );
  }

  return result;
};

const roomsAPI = {
  getRoomsWithTargetUserByUserId,
};

export default roomsAPI;
