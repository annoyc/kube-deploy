import ServerList from "../../_components/server-list";
import NextUIWrapper from "../../_components/next-provider";

const ServerManage = async () => {
  return (
    <NextUIWrapper>
      <ServerList />
    </NextUIWrapper>
  );
};

export default ServerManage;
