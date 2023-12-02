import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Sidebar from "../_components/dashboard/sidebar/sidebar";
import Navbar from "../_components/dashboard/navbar/navbar";
import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getServerAuthSession } from "~/server/auth";
import NextUIWrapper from "../_components/next-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "kubeapp 部署平台",
  description: "kubeapp部署",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  console.log(123, session);
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main className="box-border flex min-h-screen w-full flex-[1] flex-col items-center bg-gradient-to-b p-8 text-white">
          <NextUIWrapper>
            {session?.user.id ? (
              <TRPCReactProvider cookies={cookies().toString()}>
                <div className="flex h-[calc(100vh-4rem)]">
                  <div className="flex">
                    <Sidebar />
                  </div>
                  <div className="radius-xl shadow-3xl flex flex-[4] flex-col rounded-3xl bg-white">
                    <Navbar />
                    {children}
                  </div>
                </div>
              </TRPCReactProvider>
            ) : (
              <div className="flex min-h-screen w-full flex-col items-center justify-center gap-12">
                <div className="font-sans text-5xl font-extrabold text-black">
                  欢迎使用kubeapp部署系统
                </div>
                <Link
                  href={"/api/auth/signin"}
                  className="btn btn-primary w-40 rounded-3xl"
                >
                  开始使用
                </Link>
              </div>
            )}
          </NextUIWrapper>
        </main>
      </body>
    </html>
  );
}
