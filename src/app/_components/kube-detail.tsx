"use client";
import { useRouter } from "next/navigation";
import { type FunctionComponent } from "react";
import { type InstalledPackageDetail } from "~/lib/types";

interface Props {
  data: InstalledPackageDetail;
}

const KubeDetail: FunctionComponent<Props> = ({ data }) => {
  console.log("data", data);
  return (
    <div className="text-black">
      <h1>hello kube detail</h1>
    </div>
  );
};

export default KubeDetail;
