"use client";

import Image from "next/image";
import Link from "next/link";
import useOtherButton from "./OtherButton.hooks";

interface UpdateRecruitButtonProps {
  authorId: string;
  recruitId: string;
}

const OTHERS_IMAGE =
  "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/Others.svg";

function OthersButton({ authorId, recruitId }: UpdateRecruitButtonProps) {
  const { user, isShownOthers, handleClickDeleteRecruit, handleToggleOthers } =
    useOtherButton(recruitId);
  return (
    user?.userId === authorId && (
      <div className="relative flex items-center">
        <button onClick={handleToggleOthers}>
          <Image
            src={OTHERS_IMAGE}
            width={150}
            height={150}
            className="w-4 aspect-square"
            alt="others"
          />
        </button>
        {isShownOthers && (
          <article className="bg-white rounded-lg border border-gray-200 shadow-lg py-2 px-3 right-5 absolute w-28 flex flex-col items-center gap-y-1">
            <Link
              href={`recruits/applies/${recruitId}`}
              className="text-sm text-center px-2 sm:text-xs"
            >
              신청자 확인
            </Link>
            <hr className="border-[0.5px] w-full border-gray-200" />
            <Link
              onClick={handleToggleOthers}
              href={`recruits/edit/${recruitId}`}
              className="text-center text-sm rounded-md sm:text-xs"
            >
              수정하기
            </Link>
            <hr className="border-[0.5px] w-full border-gray-200 " />
            <button
              onClick={handleClickDeleteRecruit}
              className="text-sm text-center px-2 sm:text-xs"
            >
              삭제하기
            </button>
          </article>
        )}
      </div>
    )
  );
}

export default OthersButton;
