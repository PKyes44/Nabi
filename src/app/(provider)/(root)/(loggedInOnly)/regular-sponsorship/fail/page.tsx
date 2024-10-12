import Page from "@/components/Page/Page";
import Link from "next/link";

interface FailPageProps {
  searchParams: {
    message: string;
    code: string;
  };
}

export default function FailPage({
  searchParams: { message, code },
}: FailPageProps) {
  return (
    <Page isMain width="md" className="pt-10 flex flex-col items-center">
      <div className="flex flex-col">
        <img
          className="m-auto"
          width="100px"
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
        />
        <h2 className="font-extrabold text-2xl mt-5 text-center">
          결제를 실패했어요
        </h2>

        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>에러메시지</b>
          </div>
          <div className="p-grid-col text--right" id="message">
            {message}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>에러코드</b>
          </div>
          <div className="p-grid-col text--right" id="code">
            {code}
          </div>
        </div>

        <div className="p-grid-col mt-10 flex gap-x-5 self-center">
          <Link
            href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
            className="bg-blue-50 text-blue-600"
          >
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link href="https://discord.gg/A4fRFXQhRu">
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </Page>
  );
}
