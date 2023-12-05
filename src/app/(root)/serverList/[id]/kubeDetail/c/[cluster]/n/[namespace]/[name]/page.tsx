import KubeDetail from "~/app/_components/kube-detail";
import { api } from "~/trpc/server";

const Page = async ({
  params,
}: {
  params: { id: string; name: string; cluster: string; namespace: string };
}) => {
  // const detail = (await api.serversRouter.getItemById.query(params))!;
  console.log("params", params);
  const { protocal, domain, port, kubeToken } =
    (await api.serversRouter.getItemById.query({ id: params.id }))!;
  const kubeDetailRes = await api.kubesRouter.queryList.query({
    url: `${protocal}://${domain}${port ? ":" + port : ""}`,
    path: `/apis/core/packages/v1alpha1/installedpackages/plugin/helm.packages/v1alpha1/c/${params.cluster}/ns/${params.namespace}/${params.name}`,
    token: kubeToken,
  });
  console.log("kubeDetailRes", kubeDetailRes);

  return <KubeDetail data={kubeDetailRes} />;
};

export default Page;
