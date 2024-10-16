"use client";

import clientApi from "@/api/clientSide/api";
import socket from "@/socket/socket";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChatForm from "./ChatForm";
import ChatLogs from "./ChatLogs/ChatLogs";

interface ChatScreenProps {
  showChatUserId: string;
}

function ChatScreen({ showChatUserId }: ChatScreenProps) {
  const userId = useAuthStore((state) => state.currentUserId);
  const queryClient = useQueryClient();
  const [roomId, setRoomId] = useState(null);

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  const { data: targetProfile, isLoading: isTargetProfileLoading } = useQuery({
    queryKey: ["userProfiles", { userId: showChatUserId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(showChatUserId),
  });

  const { data: chatLogs, isLoading: isChatLoading } = useQuery({
    queryKey: ["chats", { targetUserId: showChatUserId }],
    queryFn: () =>
      clientApi.chats.getChatsByUserIdAndTargetUserId({
        targetUserId: showChatUserId,
        userId: userId!,
      }),
  });

  const handleScrollAtBottom = () => {
    console.log("handleScrollAtBottom");
    const chatLogs = document.getElementById("chatLogs");
    if (!chatLogs) return;
    chatLogs.scrollTop = chatLogs.scrollHeight;
  };

  useEffect(() => {
    console.log(socket);
    if (!targetProfile || !userProfile || !socket.connected) return;
    handleScrollAtBottom();
    if (socket.connected) {
      console.log("connected socket : ", socket.connected);
      socket.emit(
        "enterRoom",
        userId,
        targetProfile!.userId,
        userProfile!.nickname,
        () => {
          console.log("entered Room");
        }
      );
    }

    socket.on("returnRoomId", (roomId) => {
      setRoomId(roomId);
      console.log("roomId", roomId);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    });

    socket.on("newMessage", (targetUserId) => {
      queryClient.invalidateQueries({ queryKey: ["chats", { targetUserId }] });

      handleScrollAtBottom();
    });

    return () => {
      console.log("leavedRoom");
      socket.off("disconnecting");
    };
  }, [userProfile, targetProfile, socket]);

  if (isChatLoading || isTargetProfileLoading || isUserProfileLoading)
    return <span>채팅 기록을 불러오는 중 ...</span>;

  return (
    <div className="grow border border-black h-[450px] relative">
      <header className="border-b border-black px-5 py-3 flex gap-x-4 items-center">
        {targetProfile?.profileImageUrl ? (
          <img
            src={targetProfile!.profileImageUrl}
            alt="profile image"
            className="w-10 aspect-square rounded-xl"
          />
        ) : (
          <div className="w-10 aspect-square rounded-xl bg-gray-300" />
        )}
        <div className="flex flex-col">
          <span className="font-extrabold text-lg">
            {targetProfile?.nickname}
          </span>
          <span className="text-xs">{targetProfile?.email}</span>
        </div>
      </header>
      <ChatLogs
        userId={userId!}
        chatLogs={chatLogs!}
        targetProfile={targetProfile!}
      />
      <ChatForm
        roomId={roomId!}
        targetUserId={showChatUserId}
        userId={userId!}
      />
    </div>
  );
}

export default ChatScreen;
