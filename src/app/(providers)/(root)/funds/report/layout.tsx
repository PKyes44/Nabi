import { PropsWithChildren } from "react";

function ReportLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-black w-screen h-screen">
      <video
        className="absolute top-0 left-0 w-screen h-screen object-cover opacity-40"
        autoPlay
        muted
        loop
      >
        <source
          src="https://join.beautifulfund.org/movie/3_impact.mp4"
          type="video/mp4"
        />
      </video>
      <div className="w-screen h-screen absolute top-0 left-0">{children}</div>
    </div>
  );
}

export default ReportLayout;
