import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "@/style/globals.css";
import ClientReduxProvider from "@/app/(root)/ClientReduxProvider";

const geistPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Welcome to Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistPoppins.className} bg-slate-200`}
      >
        <main>
          <ClientReduxProvider>{children}</ClientReduxProvider>
        </main>
      </body>
    </html>
  );
}
