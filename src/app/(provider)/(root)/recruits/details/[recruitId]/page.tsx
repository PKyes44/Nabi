import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";

async function RecruitDetailPage(props: { params: { recruitId: string } }) {
  const recruitId = props.params.recruitId;

  const recruitData = await clientApi.recruits.getRecruit(recruitId);

  if (!recruitData || recruitData.length === 0) {
    return <Page>없는 글입니다</Page>;
  }

  const { title, content, maxRecruits, region, donationType } = recruitData[0];

  const donationText = donationType === "talent" ? "재능 기부" : "물품 기부";

  return (
    <Page>
      <h1>{title}</h1>
      <p>최대 모집 인원: {maxRecruits}명</p>
      <p>지역: {region}</p>
      <p>기부 유형: {donationText}</p>
      <p>{content}</p>
    </Page>
  );
}

export default RecruitDetailPage;
