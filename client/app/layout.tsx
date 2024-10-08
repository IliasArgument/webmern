import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/lib/query-provider";
import ToastProvider from "@/lib/toast-provider";
import NextAuthProvider from "@/lib/session-provider";
import { Header } from "@/components/header";
import "./styles/base.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <ToastProvider>
            {/* <NextAuthProvider> */}
            {children}
            {/* </NextAuthProvider> */}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
