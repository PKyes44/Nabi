import localFont from "next/font/local";

export const Paperlogy = localFont({
  src: [
    {
      path: "./Paperlogy-1Thin.ttf",
      weight: "100",
    },
    {
      path: "./Paperlogy-2ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "./Paperlogy-3Light.ttf",
      weight: "300",
    },
    {
      path: "./Paperlogy-4Regular.ttf",
      weight: "400",
    },
    {
      path: "./Paperlogy-5Medium.ttf",
      weight: "500",
    },
    {
      path: "./Paperlogy-6SemiBold.ttf",
      weight: "600",
    },
    {
      path: "./Paperlogy-7Bold.ttf",
      weight: "700",
    },
    {
      path: "./Paperlogy-8ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "./Paperlogy-9Black.ttf",
      weight: "900",
    },
  ],
  variable: "--font-paperlogy",
});
