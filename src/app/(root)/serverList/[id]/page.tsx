import { api } from "~/trpc/server";

const ServerDetail = async ({ params }: { params: { id: string } }) => {
  console.log("params", params);
  const detail = await api.serversRouter.getItemById.query(params);
  console.log("detail", detail);
  return <div className="text-black">{params.id}</div>;
};

export default ServerDetail;
