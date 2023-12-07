import KubeDetail from "~/app/_components/kube-detail";
import { api } from "~/trpc/server";

const Page = async ({
  params,
}: {
  params: { id: string; name: string; cluster: string; namespace: string };
}) => {
  // const detail = (await api.serversRouter.getItemById.query(params))!;
  console.log("params", params);
  const serverItem = (await api.serversRouter.getItemById.query({
    id: params.id,
  }))!;
  const kubeDetailRes = await api.kubesRouter.queryDetail.query({
    url: `${serverItem.protocal}://${serverItem.domain}${
      serverItem.port ? ":" + serverItem.port : ""
    }`,
    path: `/apis/core/packages/v1alpha1/installedpackages/plugin/helm.packages/v1alpha1/c/${params.cluster}/ns/${params.namespace}/${params.name}`,
    token: serverItem.kubeToken,
  });

  return <KubeDetail serverItem={serverItem} data={kubeDetailRes} />;
};

export default Page;
