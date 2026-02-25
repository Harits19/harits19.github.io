import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Harits CV",
  description: "Abdullah Harits CV",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html id="hidden" className="h-screen w-screen bg-gray-400" lang={"en"}>
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
