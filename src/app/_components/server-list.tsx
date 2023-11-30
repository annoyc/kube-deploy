"use client";
import React, { FunctionComponent } from "react";
import { Servers } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CreateServer from "./create-server";

interface ServerListProps {
  data: Servers[];
}

const columns = [
  {
    key: "name",
    label: "名称",
  },
  {
    key: "protocal",
    label: "协议",
  },
  {
    key: "domain",
    label: "域名",
  },
  {
    key: "port",
    label: "端口号",
  },
  {
    key: "kubeToken",
    label: "token",
  },
  {
    key: "remark",
    label: "备注",
  },
];

const ServerList: FunctionComponent<ServerListProps> = ({ data }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <div className="text-black">
      <Button onPress={onOpen} color="primary" className=" mb-4">
        新增
      </Button>
      <Table aria-label="databases list component">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(row, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateServer
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default ServerList;
