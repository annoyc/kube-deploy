"use client";
import { useRouter } from "next/navigation";
import { type FunctionComponent } from "react";

interface Props {
  data: unknown;
}

const KubeDetail: FunctionComponent<Props> = ({ data }) => {
  console.log("kube detail", data);
  return (
    <div className="">
      <h1>hello kube detail</h1>
    </div>
  );
};

export default KubeDetail;
