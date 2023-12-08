"use client";
import { type FunctionComponent } from "react";

import { api } from "~/trpc/react";
import { type kubeInfoProp } from "../(root)/serverList/[id]/kubeDetail/c/[cluster]/n/[namespace]/[name]/page";
import Loading from "~/components/Loading";
import DetailContent from "./detail-content";
interface Props {
  kubeInfo: kubeInfoProp;
}

const KubeDetail: FunctionComponent<Props> = ({ kubeInfo }) => {
  const { data, isLoading } = api.serversRouter.getItemById.useQuery({
    id: kubeInfo.id,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <DetailContent serverData={data} kubeInfo={kubeInfo} />
    </>
  );
};

export default KubeDetail;
