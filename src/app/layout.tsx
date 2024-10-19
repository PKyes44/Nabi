import type { Metadata } from "next";
import Script from "next/script";
import { Paperlogy } from "../font/paperlogy/paperlogy";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabi",
  description: "",
  icons: {
    icon: "/nabi-small.png",
  },
};

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
        />
      </head>
      <body className={`antialiased ${Paperlogy.className}`}>{children}</body>
    </html>
  );
}
