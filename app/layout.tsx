import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lolazor — Atrofdagi voqeliklarga turli rakursdan nazar",
    template: "%s | Lolazor",
  },
  description:
    "Lolazor — O'zbekistondagi siyosiy, iqtisodiy va ijtimoiy voqealarni tahlil qiluvchi podkast platformasi.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-28">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}