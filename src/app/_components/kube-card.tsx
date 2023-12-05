import React, { type FunctionComponent } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { type InstallPackageSummaryItem } from "~/lib/types";

interface Props {
  item: InstallPackageSummaryItem;
}

const KubeCard: FunctionComponent<Props> = ({ item }) => {
  return (
    <Card className="h-full max-w-[400px] cursor-pointer transition-shadow hover:translate-y-[-4px] hover:shadow-large">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={item.iconUrl}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{item.name}</p>
          <p className="text-small text-default-500">
            {item.pkgDisplayName} v{item.currentVersion.appVersion}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{item.shortDescription}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        {/* <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link> */}
        <div className="flex flex-col">
          <p className="text-small text-default-500">
            Namespace: {item.installedPackageRef.context.namespace}
          </p>
          <p className="text-small text-default-500">
            Cluster: {item.installedPackageRef.context.cluster}
          </p>
          <p className="text-small text-default-500">
            PackageVersion: {item.currentVersion.pkgVersion}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default KubeCard;
