import Page from "@/components/Page/Page";
import NewRecruitForm from "./_components/NewRecruitForm";

function NewRecruitPage() {
  return (
    <Page width="lg" isMain={false} className="h-full py-20">
      <div className="bg-white p-10 rounded-md">
        <h1 className="mb-10 text-3xl font-bold">봉사원 모집글 작성</h1>
        <NewRecruitForm />
      </div>
    </Page>
  );
}

export default NewRecruitPage;
