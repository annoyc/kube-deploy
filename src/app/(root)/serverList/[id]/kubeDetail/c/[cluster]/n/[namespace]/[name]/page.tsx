import KubeDetail from "~/app/_components/kube-detail";

export interface kubeInfoProp {
  id: string;
  name: string;
  cluster: string;
  namespace: string;
}

const Page = async ({ params }: { params: kubeInfoProp }) => {
  return <KubeDetail kubeInfo={params} />;
};

export default Page;
