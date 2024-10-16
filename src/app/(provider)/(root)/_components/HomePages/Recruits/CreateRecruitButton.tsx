"use client";

import { useRouter } from "next/navigation";

function CreateRecruitButton() {
  const router = useRouter();

  const handleClickLinkToCreateRecruitForm = () => {
    router.push("/recruits/new");
  };

  return (
    <button
      onClick={handleClickLinkToCreateRecruitForm}
      className="w-full grid place-items-center bg-white text-center py-3 text-[15px] font-paperlogy shadow-sm"
    >
      <div className="flex items-center gap-x-3">
        <img
          className="w-8 aspect-square"
          src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/PlusButton.png?t=2024-10-16T02%3A00%3A45.760Z"
          alt="create recruits button"
        />
        봉사활동 참여자 모집하기
      </div>
    </button>
  );
}

export default CreateRecruitButton;
