"use client";

import clientApi from "@/api/clientSide/api";
import { Feeds } from "@/types/feeds.types";
import { FreeMealItem } from "@/types/freeMeals.types";
import { RecruitItem } from "@/types/recruits.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef } from "react";
import FreeMeal from "../../(home)/_components/FreeMeals/FreeMeal";
import Recruit from "../../(home)/_components/Recruits/Recruit/Recruit";

interface FeedListProps {
  initialFeeds: Feeds;
  userId: string;
}

const mealImgUrl =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/meal.png";

function FeedList({ initialFeeds, userId }: FeedListProps) {
  const observerRef = useRef(null);

  const {
    data: feedsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    initialData: { pages: [initialFeeds || []], pageParams: [0] },
    queryKey: ["feeds", { page: "profile", userId }],
    queryFn: ({ pageParam }) =>
      clientApi.feeds.getFeedsByUserId(userId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) return;
      if (!pages) return;

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

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [isLoading, hasNextPage, fetchNextPage]);

  return (
    <ul className="flex flex-col w-full">
      {feedsData.pages.map((feeds) =>
        feeds?.map((feed) => {
          let recruit: RecruitItem | null = null;
          let freeMeal: FreeMealItem | null = null;
          if (feed.type === "recruit") {
            recruit = feed.feed as RecruitItem;
          } else {
            freeMeal = feed.feed as FreeMealItem;
          }
          return (
            <li key={feed.feedId}>
              <>
                {feed.type === "recruit" ? (
                  <Recruit recruit={recruit!} />
                ) : (
                  <div className="border bg-white rounded-md p-6 mb-3">
                    <div className="flex items-center gap-x-2 py-4 ">
                      <Image
                        src={mealImgUrl}
                        width={24}
                        height={24}
                        alt="무상식사"
                        className="-mt-1"
                      />
                      <h5>무상식사를 제공했어요!</h5>
                    </div>

                    <FreeMeal freeMeal={freeMeal!} />
                  </div>
                )}
              </>
            </li>
          );
        })
      )}
      {isLoading && <div className="m-auto">Loading...</div>}
      <div ref={observerRef} />
    </ul>
  );
}

export default FeedList;
