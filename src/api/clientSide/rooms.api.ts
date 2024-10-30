import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import dayjs from "dayjs";

const TABLE_ROOMS = "rooms";

const getRecentlyRoomByUserId = async (userId: string) => {
  const selectQueryForeignUserA =
    "*, userProfiles!rooms_userBId_fkey2(userId), chats!chats_roomId_fkey(createdAt)";
  const selectQueryForeignB =
    "*, userProfiles!rooms_userAId_fkey2(userId), chats!chats_roomId_fkey(createdAt)";
  const userAPromise = supabase
    .from(TABLE_ROOMS)
    .select(selectQueryForeignUserA)
    .eq("userAId", userId)
    .order("createdAt", { ascending: false, referencedTable: "chats" })
    .limit(1)
    .single();

  const userBPromise = supabase
    .from(TABLE_ROOMS)
    .select(selectQueryForeignB)
    .eq("userBId", userId)
    .order("createdAt", { ascending: false, referencedTable: "chats" })
    .limit(1)
    .single();

  const [
    { data: userAData, error: userAError },
    { data: userBData, error: userBError },
  ] = await Promise.all([userAPromise, userBPromise]);

  if (userAError) throw new Error(userAError.message);
  if (userBError) throw new Error(userBError.message);

  if (!userAData || userAData.chats.length === 0) {
    return userBData.userProfiles.userId;
  }
  if (!userBData || userBData.chats.length === 0) {
    return userAData.userProfiles.userId;
  }
  if (
    dayjs(userAData.chats[0].createdAt).isAfter(userBData.chats[0].createdAt)
  ) {
    return userAData.userProfiles.userId;
  }

  return userBData.userProfiles.userId;
};

const getRecentlyRoomsWithTargetUserByUserId = async (userId: string) => {
  const selectQueryForeignUserA =
    "*, userProfiles!rooms_userBId_fkey2(nickname, role), chats!chats_roomId_fkey(to, from, createdAt)";
  const selectQueryForeignB =
    "*, userProfiles!rooms_userAId_fkey2(nickname, role), chats!chats_roomId_fkey(to, from, createdAt)";
  const userAPromise = supabase
    .from(TABLE_ROOMS)
    .select(selectQueryForeignUserA)
    .eq("userAId", userId)
    .returns<
      (WithProfiles<Tables<"rooms">> & { chats: Tables<"chats">[] })[]
    >();

  const userBPromise = supabase
    .from(TABLE_ROOMS)
    .select(selectQueryForeignB)
    .eq("userBId", userId)
    .order("createdAt", { ascending: false, referencedTable: "chats" })
    .returns<
      (WithProfiles<Tables<"rooms">> & { chats: Tables<"chats">[] })[]
    >();

  const [
    { data: userAData, error: userAError },
    { data: userBData, error: userBError },
  ] = await Promise.all([userAPromise, userBPromise]);

  if (userAError) throw new Error(userAError.message);
  if (userBError) throw new Error(userBError.message);

  const result = [];

  if (userAData && userAData.length !== 0) {
    result.push(
      ...userAData.map((data) => {
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
          chats: data.chats,
        };
      })
    );
  }

  if (userBData && userBData.length !== 0) {
    result.push(
      ...userBData.map((data) => {
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
          chats: data.chats,
        };
      })
    );
  }

  const sortedResult = bubbleSort(result);
  return sortedResult;
};

const bubbleSort = (
  arr: {
    roomId: string;
    userId: string;
    targetUserId: string;
    userProfile: Pick<Tables<"userProfiles">, "role" | "nickname">;
    chats: Tables<"chats">[];
  }[]
) => {
  const newArr = arr;
  for (let x = 0; x < newArr.length; x++) {
    for (let y = 1; y < newArr.length - x; y++) {
      if (
        newArr[y].chats.length !== 0 &&
        (newArr[y - 1].chats.length === 0 ||
          dayjs(newArr[y - 1].chats[0].createdAt).isBefore(
            newArr[y].chats[0].createdAt
          ))
      ) {
        [newArr[y - 1], newArr[y]] = [newArr[y], newArr[y - 1]];
      }
    }
  }

  return newArr;
};

const getRoomIdByUserIdAndTargetUserId = async ({
  userId,
  targetUserId,
}: {
  userId: string;
  targetUserId: string;
}) => {
  const query = `and(userAId.eq.${userId},userBId.eq.${targetUserId}),and(userAId.eq.${targetUserId},userBId.eq.${userId})`;
  const { error, data: room } = await supabase
    .from(TABLE_ROOMS)
    .select("roomId")
    .or(query)
    .single();
  if (error) throw new Error(error.message);

  return room.roomId;
};

const roomsAPI = {
  getRecentlyRoomsWithTargetUserByUserId,
  getRoomIdByUserIdAndTargetUserId,
  getRecentlyRoomByUserId,
};

export default roomsAPI;
