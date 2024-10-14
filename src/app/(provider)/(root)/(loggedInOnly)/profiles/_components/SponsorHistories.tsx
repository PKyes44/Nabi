"use client";
import clientApi from "@/api/clientSide/api";
import { useAuthStore } from "@/zustand/auth.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { useEffect, useRef } from "react";
import Replies from "../../../_components/Replies";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s초",
    past: "%s 전",
    s: "방금",
    m: "1분",
    mm: "%d분",
    h: "1시간",
    hh: "%d시간",
    d: "하루",
    dd: "%d일",
    M: "1달",
    MM: "%d달",
    y: "1년",
    yy: "%d년",
  },
});

function SponsorHistories() {
  const userId = useAuthStore((state) => state.currentUserId);
  const observerRef = useRef(null);
  const {
    data: recruitsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["recruits", { userId }],
    queryFn: ({ pageParam }) =>
      clientApi.recruits.getPaginatedRecruits(userId!, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) return;
      return pages.length;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // 클린업
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading]);

  return (
    <div>
      <ul className="flex flex-col gap-y-3">
        {recruitsData?.pages.map((recruits) =>
          recruits?.map((recruit) => (
            <li key={recruit.recruitId}>
              <div className="w-full h-96 bg-indigo-300 border rounded-md p-5">
                <strong>{recruit.title}</strong>
                <p>{recruit.content}</p>
                <p className="mb-4">{dayjs(recruit.createdAt).fromNow()}</p>
                <Replies recruitId={recruit.recruitId} />
              </div>
            </li>
          ))
        )}
        <p ref={observerRef} className="text-transparent">
          하나 더 보여주기
        </p>
      </ul>
    </div>
  );
}

export default SponsorHistories;
