function NewRecruitPage() {
  return (
    <div>
      <h1 className="mb-10">봉사원 모집글 작성</h1>

      <section className="flex flex-col gap-y-4">
        <div>
          <span>제목</span>
          <input className="border border-black" type="text" />
        </div>
        <div>
          <span>내용</span>
          <input className="border border-black" type="text" />
        </div>
        <div>
          <span>후원자 유형</span>
          <select
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
            name="donationType"
            id="donationType"
            className="border border-black"
          >
            <option value="talentDonation">재능기부</option>
            <option value="articleDonation">물품기부</option>
          </select>
        </div>
        <div>
          <span>모집상태</span>
          <select name="status" id="status" className="border border-black">
            <option value="recruiting">모집중</option>
            <option value="end">모집완료</option>
          </select>
        </div>
        <div>
          <span>모집인원</span>
          <input className="border border-black" type="number" />
        </div>
        <div>
          <span>지역</span>
          <input className="border border-black" type="text" />
        </div>
      </section>
    </div>
  );
}

export default NewRecruitPage;
