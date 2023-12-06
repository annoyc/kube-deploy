"use client";
import { type Servers } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FunctionComponent } from "react";
import KubeCard from "~/app/_components/kube-card";
import Loading from "~/components/Loading";
import { type InstallPackageSummaryItem } from "~/lib/types";
import { api } from "~/trpc/react";

interface Props {
  server: Servers;
}

interface QuertData {
  installedPackageSummaries: InstallPackageSummaryItem[];
}

const KubeList: FunctionComponent<Props> = ({ server }) => {
  const router = useRouter();
  const { protocal, domain, port, kubeToken, id } = server;
  const { isLoading, error, data } =
    api.kubesRouter.queryList.useQuery<QuertData>({
      url: `${protocal}://${domain}${port ? ":" + port : ""}`,
      path: "/apis/core/packages/v1alpha1/installedpackages",
      token: kubeToken,
    });
  console.log("kubesApiRes", data);

  const handleKubeDetail: (item: InstallPackageSummaryItem) => void = (
    item,
  ) => {
    router.push(
      `/serverList/${id}/kubeDetail/c/${item.installedPackageRef.context.cluster}/n/${item.installedPackageRef.context.namespace}/${item.name}?text=${item.name}`,
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const arrs = data?.installedPackageSummaries ?? [];
  if (isLoading) return <Loading />;
  if (error) return <h1>{error.message}</h1>;
  return (
    <div className="box-border grid grid-cols-4 gap-5">
      {arrs.map((item) => (
        <div
          key={item.name}
          className="h-full"
          onClick={() => handleKubeDetail(item)}
        >
          <KubeCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default KubeList;
