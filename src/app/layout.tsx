import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Sidebar from "./ui/dashboard/sidebar/sidebar";
import Navbar from "./ui/dashboard/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";

import { TRPCReactProvider } from "~/trpc/react";

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
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        {session?.user.id ? (
          <TRPCReactProvider cookies={cookies().toString()}>
            <div className="flex min-h-screen p-8">
              <div className="flex">
                <Sidebar />
              </div>
              <div className="radius-xl shadow-3xl flex flex-[4] flex-col rounded-3xl bg-white">
                <Navbar />
                <div className="p-8">{children}</div>
              </div>
            </div>
          </TRPCReactProvider>
        ) : (
          <div className="p-8">{children}</div>
        )}
      </body>
    </html>
  );
}
