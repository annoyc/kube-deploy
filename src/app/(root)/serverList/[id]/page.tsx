"use client";
import { api } from "~/trpc/react";
import KubeList from "./KubeList";
import { type Servers } from "@prisma/client";
import Loading from "~/components/Loading";

const ServerDetail = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = api.serversRouter.getItemById.useQuery<Servers>({
    id: params.id,
  });
  return !isLoading && data!.id ? <KubeList server={data!} /> : <Loading />;
};

export default ServerDetail;
