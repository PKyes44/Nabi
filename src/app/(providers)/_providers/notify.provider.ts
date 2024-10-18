"use client";

import clientApi from "@/api/clientSide/api";
import { supabase } from "@/supabase/client";
import { Notify } from "@/types/notify.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useNotifyStore } from "@/zustand/notify.store";
import dayjs from "dayjs";
import { PropsWithChildren, useEffect } from "react";

function NotificationProvider({ children }: PropsWithChildren) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const addNotify = useNotifyStore((state) => state.addNotify);
  const setIsCheckedNotifyList = useNotifyStore(
    (state) => state.setIsCheckedNotifyList
  );

  useEffect(() => {
    supabase
      .channel("freeMeals")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "freeMeals" },
        async (payload) => {
          console.log("FreeMeals Table Change received!", payload);
          if (currentUser?.role !== "recipient") return;

          const storeId = payload.new.storeId;
          const storeData = await clientApi.storeData.getStoreDataByStoreId(
            storeId
          );

          const title = "새로운 무상식사 글 알림";
          const content = `${
            storeData.brandName.length < 6
              ? storeData.brandName
              : storeData.brandName.slice(0, 5) + "..."
          }의 점주분께서 무상식사를 제공하시겠다고 하십니다`;
          const url = `/free-meals/map?lat=${storeData.lat}&lng=${storeData.lng}&brandName=${storeData.brandName}`;
          const notifiedAt = dayjs(payload.commit_timestamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );

          const notify: Notify = {
            title,
            content,
            url,
            notifiedAt,
          };
          addNotify(notify);
          setIsCheckedNotifyList(false);
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    supabase
      .channel("chats")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        async (payload) => {
          console.log("Chats Table Change received!", payload);

          const from = payload.new.from;
          const to = payload.new.to;

          console.log(from, to, currentUser?.userId);
          if (to !== currentUser?.userId) return;
          console.log("received chat !");

          const sendUser = await clientApi.profiles.getProfileByUserId(to);

          const title = "새로운 채팅 알림";
          const content = `${sendUser?.nickname}님께서 채팅메시지를 보내셨습니다`;
          const url = `/chats?showChatUserId=${from}`;
          const notifiedAt = dayjs(payload.commit_timestamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );

          const notify: Notify = {
            title,
            content,
            url,
            notifiedAt,
          };
          addNotify(notify);
          setIsCheckedNotifyList(false);
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    supabase
      .channel("sponsorShipOrder")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sponsorShipOrder" },
        async (payload) => {
          console.log("sponsorship order Table Change received!", payload);

          const sponsorShipId = payload.new.sponsorShipId;
          const sponsorShipData =
            await clientApi.sponsorShip.getSponsorShipBySponsorShipId(
              sponsorShipId
            );

          if (sponsorShipData.sponsorId !== currentUser?.userId) return;
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    supabase
      .channel("sponsorShip")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sponsorShip" },
        async (payload) => {
          console.log("sponsorship Table Change received!", payload);

          const recipientId = payload.new.recipientId;

          if (recipientId !== currentUser?.userId) return;

          const sponsorId = payload.new.sponsorId;
          const sponsorProfile = await clientApi.profiles.getProfileByUserId(
            sponsorId
          );

          const title = "새로운 정기 결연 등록";
          const content = `${sponsorProfile?.nickname}님께서 당신에게 정기후원을 하기로 결정하셨습니다`;
          const url = "/";
          const notifiedAt = dayjs(payload.commit_timestamp).format(
            "YYYY-MM-DD HH:mm:ss"
          );

          const notify: Notify = {
            title,
            content,
            url,
            notifiedAt,
          };
          addNotify(notify);
          setIsCheckedNotifyList(false);
        }
      )
      .subscribe();
  }, []);

  return children;
}

export default NotificationProvider;
