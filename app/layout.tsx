import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mock.AI Rewind Dashboard",
  description: "Mock.AI Rewind Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`h-screen ${inter.className}`}>
        <Header />
        <main className="h-5/6">{children}</main>
      </body>
    </html>
  );
}
