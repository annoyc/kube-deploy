import React, { type FunctionComponent } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { type InstallPackageSummaryItem } from "~/lib/types";

interface Props {
  item: InstallPackageSummaryItem;
}

const KubeCard: FunctionComponent<Props> = ({ item }) => {
  return (
    <Card className="max-w-[400px]">
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
          <p className="text-small text-default-500">{item.shortDescription}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default KubeCard;
