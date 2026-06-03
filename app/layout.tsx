import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { RouteShell } from "@/components/layout/RouteShell";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Purple Ruler KS4 Workbooks",
  description:
    "Lesson-aligned add-on workbooks for Purple Ruler KS4 English and Maths",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="pr-room-bg fixed inset-0 -z-10" aria-hidden />
        <RouteShell>{children}</RouteShell>
      </body>
    </html>
  );
}
