"use client";
import { type FunctionComponent, useState, useEffect } from "react";
import { api } from "~/trpc/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Textarea,
  type Selection,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Servers } from "@prisma/client";

interface CreateDatabaseProps {
  onOpenChange: () => void;
  isOpen: boolean;
  isEdit: boolean;
  rowData: Pick<
    Servers,
    "protocal" | "name" | "domain" | "port" | "remark" | "kubeToken"
  >;
}

const CreateDatabase: FunctionComponent<CreateDatabaseProps> = ({
  isOpen,
  onOpenChange,
  isEdit,
  rowData,
}) => {
  const [formData, setFormData] = useState<
    Pick<
      Servers,
      "protocal" | "name" | "domain" | "port" | "remark" | "kubeToken"
    >
  >({
    protocal: "http",
    name: "",
    domain: "",
    port: "",
    remark: "",
    kubeToken: "",
  });
  const [confirm, setConfirm] = useState(false);

  const onModalClose = (close: () => void) => {
    clearForm();
    close();
  };
  const router = useRouter();
  const createDatabaseResult = api.serversRouter.create.useMutation({
    onSuccess: (res) => {
      clearForm();
      router.refresh();
      console.log("createDatabaseResult", res);
    },
  });
  const updateServerResult = api.serversRouter.update.useMutation({
    onSuccess: (res) => {
      clearForm();
      router.refresh();
      console.log("updateServerResult", res);
    },
  });
  const onConfirm = () => {
    setConfirm(true);
    if (
      !formData.name ||
      !formData.domain ||
      !formData.port ||
      !formData.kubeToken
    ) {
      return false;
    }
    console.log(formData);
    return true;
  };
  const clearForm = () => {
    setConfirm(false);
    setFormData({
      protocal: "http",
      name: "",
      domain: "",
      port: "",
      remark: "",
      kubeToken: "",
    });
  };

  const onProtocalChange: (keys: Selection) => void = (keys) => {
    console.log("keys", keys);
    setFormData({
      ...formData,
      protocal: keys.currentKey,
    });
  };
  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (isEdit) {
      console.log("rowData", rowData);
      setFormData((prevData) => ({ ...prevData, ...rowData }));
    }
  }, [isEdit]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              {isEdit ? "编辑服务器" : "新增服务器"}
            </ModalHeader>
            <ModalBody>
              <Input
                className="text-black"
                label="名称"
                variant="bordered"
                isClearable
                isRequired
                value={formData.name}
                color={!formData.name && confirm ? "danger" : "default"}
                onValueChange={(value) => handleChange("name", value)}
                errorMessage={confirm && !formData.name && "请输入名称"}
              />
              <Select
                defaultSelectedKeys={["http"]}
                onSelectionChange={onProtocalChange}
                label="协议"
                variant="bordered"
                isRequired
              >
                <SelectItem className="text-black" key={"http"} value="http">
                  http
                </SelectItem>
                <SelectItem
                  className="text-black"
                  key={"https"}
                  value={formData.protocal}
                >
                  https
                </SelectItem>
              </Select>
              <Input
                className="text-black"
                label="域名"
                variant="bordered"
                isClearable
                isRequired
                value={formData.domain}
                onValueChange={(value) => handleChange("domain", value)}
                color={!formData.domain && confirm ? "danger" : "default"}
                errorMessage={confirm && !formData.domain && "请输入域名"}
              />
              <Input
                className="text-black"
                label="端口号"
                variant="bordered"
                isClearable
                isRequired
                value={formData.port}
                onValueChange={(value) => handleChange("port", value)}
                color={!formData.port && confirm ? "danger" : "default"}
                errorMessage={confirm && !formData.port && "请输入端口号"}
              />
              <Input
                className="text-black"
                label="备注"
                variant="bordered"
                isClearable
                value={formData.remark}
                onValueChange={(value) => handleChange("remark", value)}
              />
              <Textarea
                className="text-black"
                label="kubeToken"
                variant="bordered"
                isRequired
                value={formData.kubeToken}
                onValueChange={(value) => handleChange("kubeToken", value)}
                color={!formData.kubeToken && confirm ? "danger" : "default"}
                errorMessage={
                  confirm && !formData.kubeToken && "请输入kubeToken"
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => onModalClose(onClose)}
              >
                关闭
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (!onConfirm()) return;
                  if (isEdit) {
                    updateServerResult.mutate(formData);
                  } else {
                    createDatabaseResult.mutate(formData);
                  }
                  onModalClose(onClose);
                }}
              >
                确定
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateDatabase;
