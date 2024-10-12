import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabi",
  description: "",
};

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer,drawing`}
        />
      </head>
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
