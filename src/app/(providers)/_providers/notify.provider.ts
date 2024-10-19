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

          const { data: user } = await supabase.auth.getUser();

          if (!user) return;

          const profile = await clientApi.profiles.getProfileByUserId(
            user.user?.id!
          );

          if (!profile) return;

          if (profile.role !== "recipient") return;

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

          const { data: user } = await supabase.auth.getUser();

          if (!user) return;
          if (user.user?.id !== to) return;

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
          const { data: user } = await supabase.auth.getUser();

          if (!user) return;
          if (user.user?.id !== sponsorShipData.sponsorId) return;

          const recipientId = sponsorShipData.recipientId;
          const recipientProfile = await clientApi.profiles.getProfileByUserId(
            recipientId
          );

          const title = "정기후원 결제 알림";
          const content = `${
            recipientProfile!.nickname.length < 6
              ? recipientProfile?.nickname
              : recipientProfile?.nickname.slice(0, 5) + "..."
          }님을 위한 정기후원 결제가 완료되었습니다`;
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
          console.log("notify: ", notify);
          addNotify(notify);
          setIsCheckedNotifyList(false);
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

          const { data: user } = await supabase.auth.getUser();

          if (!user) return;

          if (recipientId !== user.user?.id) return;

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
