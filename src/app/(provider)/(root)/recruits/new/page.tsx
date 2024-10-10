"use client";

import { useState } from "react";

function NewRecruitPage() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [sponserType, setSponserType] = useState("individual");
  const [donationType, setDonationType] = useState("talentDonation");
  const [maxRecruits, setMaxRecruits] = useState(0);
  const [region, setRegion] = useState("");

  const handleClickNewRecruit = () => {
    console.log(title, context, sponserType, donationType, maxRecruits, region);
  };

  return (
    <div>
      <h1 className="mb-10">봉사원 모집글 작성</h1>

      <section className="flex flex-col gap-y-4">
        <div>
          <span>제목</span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black"
            type="text"
          />
        </div>
        <div>
          <span>내용</span>
          <input
            onChange={(e) => setContext(e.target.value)}
            className="border border-black"
            type="text"
          />
        </div>
        <div>
          <span>후원자 유형</span>
          <select
            onChange={(e) => setSponserType(e.target.value)}
            name="sponserType"
            id="sponserType"
            className="border border-black"
          >
            <option value="individual">개인</option>
            <option value="organization">후원단체</option>
            <option value="gathering">후원모임</option>
          </select>
        </div>
        <div>
          <span>기부 유형</span>
          <select
            onChange={(e) => setDonationType(e.target.value)}
            name="donationType"
            id="donationType"
            className="border border-black"
          >
            <option value="talentDonation">재능기부</option>
            <option value="articleDonation">물품기부</option>
          </select>
        </div>
        <div>
          <span>모집인원</span>
          <input
            onChange={(e) => setMaxRecruits(Number(e.target.value))}
            className="border border-black"
            type="number"
          />
        </div>
        <div>
          <span>지역</span>
          <input
            onChange={(e) => setRegion(e.target.value)}
            className="border border-black"
            type="text"
          />
        </div>
        <div>
          <button
            onClick={handleClickNewRecruit}
            className="border border-black"
          >
            글 올리기
          </button>
        </div>
      </section>
    </div>
  );
}

export default NewRecruitPage;
