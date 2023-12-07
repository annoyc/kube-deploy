/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { type FunctionComponent, useState } from "react";
import { type InstalledPackageDetail } from "~/lib/types";
import { DiffEditor, Editor } from "@monaco-editor/react";
import Toast from "~/components/Toast";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type Servers } from "@prisma/client";
import { api } from "~/trpc/react";
interface Props {
  data: InstalledPackageDetail;
  serverItem: Servers;
}

const KubeDetail: FunctionComponent<Props> = ({ data, serverItem }) => {
  const router = useRouter();
  const valuesApplied = data.installedPackageDetail.valuesApplied;
  const originalData = JSON.stringify(JSON.parse(valuesApplied), null, 2);

  const [editorValue, setEditorValue] = useState(originalData);
  const [toastMsg, setToastMsg] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorMount = (editor: any) => {
    const modifiedEditor = editor.getModifiedEditor();
    modifiedEditor.onDidChangeModelContent((_) => {
      setEditorValue(modifiedEditor.getValue());
    });
  };
  console.log("data.installedPackageDetail", data.installedPackageDetail);
  const modifiedValue = JSON.stringify(JSON.parse(editorValue));
  const deployMutation = api.kubesRouter.deploy.useMutation({
    onSuccess: () => {
      router.back();
    },
  });

  return (
    <>
      <div className="h-full w-full">
        <div className="mb-5 flex items-center justify-between gap-6">
          <div className="flex flex-[8] flex-wrap gap-4">
            <Input
              isDisabled
              type="text"
              label="App版本"
              defaultValue={
                data.installedPackageDetail.currentVersion.appVersion
              }
              className="max-w-[11rem] text-black"
            />
            <Input
              isDisabled
              type="text"
              label="Package版本"
              defaultValue={
                data.installedPackageDetail.currentVersion.pkgVersion
              }
              className="max-w-[11rem] text-black"
            />
            <Input
              isDisabled
              type="text"
              label="releaseRevision"
              defaultValue={
                data.installedPackageDetail.customDetail.releaseRevision + ""
              }
              className="max-w-[11rem] text-black"
            />
          </div>
          <div className="flex flex-[2] items-center justify-end gap-4">
            <div
              className="btn btn-primary"
              onClick={() => {
                deployMutation.mutate({
                  url: `${serverItem.protocal}://${serverItem.domain}${
                    serverItem.port ? ":" + serverItem.port : ""
                  }`,
                  path: "/apis/core/packages/v1alpha1/installedpackages",
                  token: serverItem.kubeToken,
                  data: {
                    ...data.installedPackageDetail,
                    values: modifiedValue,
                  },
                });
              }}
            >
              开始部署
            </div>
            <div
              className="btn btn-info"
              onClick={() => {
                router.back();
              }}
            >
              返回
            </div>
          </div>
        </div>
        <DiffEditor
          height="72vh"
          language="json"
          original={originalData}
          modified={editorValue}
          onMount={handleEditorMount}
        />

        <div className="m-6 h-[100vh]">
          <h2 className="mb-4 font-bold text-black">部署说明</h2>
          <Editor
            language="markdown"
            defaultValue={data.installedPackageDetail.postInstallationNotes}
          />
        </div>
      </div>
      {toastMsg && (
        <Toast
          className="alert-error"
          setToastMsg={setToastMsg}
          message={toastMsg}
        ></Toast>
      )}
    </>
  );
};

export default KubeDetail;
