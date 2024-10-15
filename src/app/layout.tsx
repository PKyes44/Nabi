import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabi",
  description: "",
  icons: {
    icon: "/nabi-small.png",
  },
};

import localFont from "next/font/local";

export const Paperlogy = localFont({
  src: [
    {
      path: "./font/paperlogy/Paperlogy-1Thin.ttf",
      weight: "100",
    },
    {
      path: "./font/paperlogy/Paperlogy-2ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "./font/paperlogy/Paperlogy-3Light.ttf",
      weight: "300",
    },
    {
      path: "./font/paperlogy/Paperlogy-4Regular.ttf",
      weight: "400",
    },
    {
      path: "./font/paperlogy/Paperlogy-5Medium.ttf",
      weight: "500",
    },
    {
      path: "./font/paperlogy/Paperlogy-6SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./font/paperlogy/Paperlogy-7Bold.ttf",
      weight: "700",
    },
    {
      path: "./font/paperlogy/Paperlogy-8ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "./font/paperlogy/Paperlogy-9Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-paperlogy",
});

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
