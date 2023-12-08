"use client";
import React, {
  type FunctionComponent,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Servers } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import CreateServer from "./create-server";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Loading from "~/components/Loading";

const columns = [
  {
    key: "name",
    label: "服务器名称",
    width: 200,
  },
  {
    key: "protocal",
    label: "协议",
    width: 100,
  },
  {
    key: "domain",
    label: "域名",
    width: 300,
  },
  {
    key: "port",
    label: "端口号",
    width: 100,
  },
  {
    key: "remark",
    label: "备注",
    width: 200,
  },
  {
    key: "kubeToken",
    label: "kubeToken",
    width: 500,
  },
  {
    key: "actions",
    label: "操作",
    width: 100,
  },
];

type RowDataType = Pick<
  Servers,
  "protocal" | "name" | "domain" | "port" | "remark" | "kubeToken"
>;

const ServerList: FunctionComponent = () => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<RowDataType>({
    protocal: "http",
    name: "",
    domain: "",
    port: "",
    remark: "",
    kubeToken: "",
  });
  const router = useRouter();
  const deleteRes = api.serversRouter.delete.useMutation({
    onSuccess: (res) => {
      router.refresh();
      console.log("res", res);
    },
  });
  const renderCell = React.useCallback((server: Servers, columnKey: string) => {
    const cellValue = server[columnKey] as ReactNode;

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-4">
            <Tooltip color="primary" content="查看">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon
                  onClick={() => {
                    router.push(`/serverList/${server.id}?text=${server.name}`);
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="编辑">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon
                  onClick={() => {
                    setIsEdit(true);
                    setRowData(server);
                    onOpen();
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="删除">
              <span
                onClick={() => {
                  deleteRes.mutate({
                    id: server.id,
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

  useEffect(() => {
    if (!isOpen && isEdit) {
      setIsEdit(false);
    }
  }, [isOpen]);

  const { isLoading, data } = api.serversRouter.getAll.useQuery<Servers[]>();

  return !isLoading && data?.length ? (
    <div className="text-black">
      <Button onPress={onOpen} color="primary" className=" mb-4">
        新增
      </Button>
      <Table aria-label="databases list component">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn align="center" width={column.width} key={column.key}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {(columnKey) => (
                <TableCell className=" min-w-[100px] max-w-md overflow-auto">
                  {renderCell(row, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateServer
        isEdit={isEdit}
        rowData={rowData}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  ) : (
    <div className="h-full flex items-center justify-center">
      <Loading className="flex h-full items-center justify-center" />
    </div>
  );
};

export default ServerList;
