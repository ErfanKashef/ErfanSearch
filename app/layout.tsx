import type { Metadata } from "next";
import { Roboto, Vazirmatn } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocaKashef",
  description: "develop by erfan kashef",
};

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const vazirmatn = Vazirmatn({
  weight: ["400", "500", "700"],
  subsets: ["arabic"], // برای فارسی و عربی
  variable: "--font-vazirmatn",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable} ${vazirmatn.variable}`}>
        {children}
        <div id="portal" />
      </body>
    </html>
  );
}
