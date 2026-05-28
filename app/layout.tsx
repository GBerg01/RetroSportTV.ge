import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "RetroSportTV.ge — Channel-surf the greatest sports moments",
  description:
    "Nostalgic sports highlight TV. Surf curated YouTube channels through a retro CRT interface — NBA 2000s, Kobe TV, NFL Big Hits, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#e8e8e8]">
        {children}
      </body>
    </html>
  );
}
