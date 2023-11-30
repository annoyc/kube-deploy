import ServerList from "../../_components/server-list";
import NextUIWrapper from "../../_components/next-provider";
import { api } from "~/trpc/server";

const ServerManage = async () => {
  const serversData = await api.serversRouter.getAll.query();
  return (
    <div>
      <NextUIWrapper>
        <ServerList data={serversData} />
      </NextUIWrapper>
    </div>
  );
};

export default ServerManage;
