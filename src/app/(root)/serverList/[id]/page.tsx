import { api } from "~/trpc/server";
import KubeList from "./KubeList";

const ServerDetail = async ({ params }: { params: { id: string } }) => {
  const detail = (await api.serversRouter.getItemById.query(params))!;
  console.log("detail", detail);
  return <KubeList server={detail} />;
};

export default ServerDetail;
