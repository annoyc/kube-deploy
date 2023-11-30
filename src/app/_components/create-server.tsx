"use client";
import { type FunctionComponent, useState } from "react";
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

interface CreateDatabaseProps {
  onOpen: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
}

const CreateDatabase: FunctionComponent<CreateDatabaseProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState({
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
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              新增服务器
            </ModalHeader>
            <ModalBody>
              <Input
                className="text-black"
                label="名称"
                variant="bordered"
                isClearable
                isRequired
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
                onValueChange={(value) => handleChange("port", value)}
                color={!formData.port && confirm ? "danger" : "default"}
                errorMessage={confirm && !formData.port && "请输入端口号"}
              />
              <Input
                className="text-black"
                label="备注"
                variant="bordered"
                isClearable
                onValueChange={(value) => handleChange("remark", value)}
              />
              <Textarea
                className="text-black"
                label="kubeToken"
                variant="bordered"
                isRequired
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
                  createDatabaseResult.mutate(formData);
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
