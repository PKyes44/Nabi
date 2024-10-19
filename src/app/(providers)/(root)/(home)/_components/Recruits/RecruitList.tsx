/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Recruit from "./Recruit";

interface RecruitListProps {
  profile?: Tables<"userProfiles">;
  initialRecruitList: (Tables<"recruits"> & {
    userProfiles: Tables<"userProfiles">;
  } & {
    replies: (Tables<"replies"> & {
      userProfiles: Tables<"userProfiles">;
    })[];
  })[];
}

function RecruitList({ initialRecruitList, profile }: RecruitListProps) {
  const observerRef = useRef(null);

  const {
    data: recruitsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    initialData: { pages: [initialRecruitList || []], pageParams: [0] },
    queryKey: ["recruits"],
    queryFn: ({ pageParam }) => {
      if (profile)
        return clientApi.recruits.getInfiniteRecruitsByUserId(
          pageParam,
          profile.userId,
          profile.role
        );

      return clientApi.recruits.getInfiniteRecruits(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) return;
      if (!pages) return;

      return pages.length;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
    <ul className="w-full flex flex-col gap-y-4">
      {recruitsData.pages.map((page) =>
        page?.map((recruit) => (
          <li
            key={recruit.recruitId}
            className="bg-white mb-2 p-10 pt-7 shadow-md rounded-md relative"
          >
            <Recruit recruit={recruit} />
          </li>
        ))
      )}

      {isLoading && <div className="m-auto">Loading...</div>}
      <div ref={observerRef} />
    </ul>
  );
}

export default RecruitList;
