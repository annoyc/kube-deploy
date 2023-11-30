import { api } from "~/trpc/server";
import { cookies } from "next/headers";
import Sidebar from "../_components/dashboard/sidebar/sidebar";
import Navbar from "../_components/dashboard/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";

import { TRPCReactProvider } from "~/trpc/react";

import NextUIWrapper from "../_components/next-provider";
import Link from "next/link";

export default async function Home({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <main className="justify-cente flex h-full w-full flex-[1] flex-col items-center bg-gradient-to-b p-8 text-white">
      <NextUIWrapper>
        {session?.user.id ? (
          <TRPCReactProvider cookies={cookies().toString()}>
            <div className="flex min-h-screen">
              <div className="flex">
                <Sidebar />
              </div>
              <div className="radius-xl shadow-3xl flex flex-[4] flex-col rounded-3xl bg-white">
                <Navbar />
                <div>{children}</div>
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
              className="btn-default btn w-40 rounded-3xl"
            >
              开始使用
            </Link>
          </div>
        )}
      </NextUIWrapper>
    </main>
  );
}
