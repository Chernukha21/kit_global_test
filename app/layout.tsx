
import type { Metadata } from "next";
import "./globals.css";
import {ReactNode} from "react";


export const metadata: Metadata = {
  title: "Kit global test task",
  description: "Kit global test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] min-h-screen p-3">
        {children}
      </body>
    </html>
  );
}
