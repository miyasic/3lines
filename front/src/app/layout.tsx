import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAdScript from "@/components/googleads-script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "今北産業",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAdScript />
    </html>
  );
}
