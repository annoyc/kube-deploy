/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { type Servers } from "@prisma/client";
import { type FunctionComponent } from "react";
import KubeCard from "~/app/_components/kube-card";
import { type InstallPackageSummaryItem } from "~/lib/types";
import { api } from "~/trpc/react";

interface Props {
  server: Servers;
}
interface kubesApiResType {
  data?: {
    installedPackageSummaries: InstallPackageSummaryItem[];
  };
}

const KubeList: FunctionComponent<Props> = ({ server }) => {
  const { protocal, domain, port, kubeToken } = server;
  const kubesApiRes: kubesApiResType = api.kubesRouter.queryList.useQuery({
    url: `${protocal}://${domain}${port ? ":" + port : ""}`,
    path: "/apis/core/packages/v1alpha1/installedpackages",
    token: kubeToken,
  });
  console.log("kubesApiRes", kubesApiRes.data);
  const arrs = kubesApiRes.data?.installedPackageSummaries ?? [];
  return (
    <div className="grid grid-cols-4 gap-5">
      {arrs.map((item) => (
        <KubeCard key={item.name} item={item} />
      ))}
    </div>
  );
};

export default KubeList;
