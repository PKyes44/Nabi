import ButtonGroup from "@/components/Button/ButtonGroup";
import Container from "@/components/Container/Container";

interface FailPageProps {
  searchParams: {
    message: string;
    code: string;
  };
}

export default function FailPage({
  searchParams: { message, code },
}: FailPageProps) {
  console.log(message, code); //

  return (
    <Container isMain width="md" className="pt-10 flex flex-col items-center">
      <div className="flex flex-col items-center bg-white py-9 px-20 rounded-md gap-y-10 w-[800px]">
        <div className="flex items-center gap-x-3">
          <img
            width="40px"
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/FailPayment.png"
            alt="에러 이미지"
          />
          <h2 className="font-extrabold text-2xl text-center">결제 실패</h2>
        </div>
        <div className="w-full flex flex-col gap-y-5 text-black">
          <div>
            <p className="font-bold">결제코드</p>
            <p>0dcdafba-bcb4-4361-a24e-ffc044781aea</p>
          </div>

          <div className="flex gap-x-10">
            <div>
              <p className="font-bold">결제명</p>
              <p>나비 : 익명의 후원자1님의 정기후원</p>
            </div>
            <div>
              <p className="font-bold">후원금액</p>
              <p>10,000원</p>
            </div>
          </div>

          <div>
            <p className="font-bold">카드번호</p>
            <p>3212-****-****-***5</p>
          </div>

          <div>
            <p className="font-bold">결제일</p>
            <p>2024-10-19 02:01</p>
          </div>
          <ButtonGroup
            intent="none"
            value="결제화면으로 돌아가기"
            className="ml-auto bg-[#ff4d4d42] text-[#E91313] font-bold"
          />
        </div>
      </div>
    </Container>
  );
}
