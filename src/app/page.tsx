import { api } from "~/trpc/server";

import ServersList from "./_components/server-list";
import NextUIWrapper from "./_components/next-provider";

export default async function Home() {
  const serversData = await api.serversRouter.getAll.query();
  console.log("serversData", serversData);

  return (
    <main className="justify-cente flex h-full w-full flex-[1] flex-col items-center bg-gradient-to-b p-8 text-white">
      <NextUIWrapper>
        <ServersList data={serversData} />
      </NextUIWrapper>
    </main>
  );
}
