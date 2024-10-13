"use client";

import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import ChatLogs from "./ChatLogs";

interface ChatScreenProps {
  showChatUserId: string;
}

function ChatScreen({ showChatUserId }: ChatScreenProps) {
  const userId = useAuthStore((state) => state.currentUserId);

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfiles", { userId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(userId!),
  });

  const { data: targetProfile, isLoading: isTargetProfileLoading } = useQuery({
    queryKey: ["userProfiles", { userId: showChatUserId }],
    queryFn: () => clientApi.profiles.getProfileByUserId(showChatUserId),
  });

  const { data: chatLogs, isLoading: isChatLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      clientApi.chats.getChatsByUserIdAndTargetUserId({
        targetUserId: showChatUserId,
        userId: userId!,
      }),
  });

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
      <form className="absolute bottom-0 left-0 w-full  flex">
        <input
          className="grow bg-transparent py-2 px-5 outline-none border-t border-black border-r"
          type="text"
        />
        <button
          type="submit"
          className="w-24 bg-yellow-300 bg-opacity-45 text-yellow-500 font-bold"
        >
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
