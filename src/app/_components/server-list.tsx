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
  Tooltip,
} from "@nextui-org/react";
import CreateServer from "./create-server";
import { User } from "next-auth";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

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
  {
    key: "actions",
    label: "操作",
  },
];

const ServerList: FunctionComponent<ServerListProps> = ({ data }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const router = useRouter();
  const deleteRes = api.serversRouter.delete.useMutation({
    onSuccess: (res) => {
      router.refresh();
      console.log("res", res);
    },
  });
  const renderCell = React.useCallback((user: User, columnKey) => {
    const cellValue = user[columnKey];
    const handleDelete = () => {
      console.log("user", user);
    };

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip color="primary" content="查看">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="编辑">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="删除">
              <span
                onClick={() => {
                  handleDelete();
                  deleteRes.mutate({
                    id: user.id,
                  });
                }}
                className="cursor-pointer text-lg text-danger active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
                <TableCell>{renderCell(row, columnKey)}</TableCell>
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
