"use client";
import { type InstalledPackageDetail } from "~/lib/types";
import { DiffEditor, Editor } from "@monaco-editor/react";
import Toast from "~/components/Toast";
import { Input } from "@nextui-org/react";
import { useState, type FC, useEffect } from "react";
import { type Servers } from "@prisma/client";
import { type kubeInfoProp } from "../(root)/serverList/[id]/kubeDetail/c/[cluster]/n/[namespace]/[name]/page";
import { api } from "~/trpc/react";
import Loading from "~/components/Loading";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

interface Props {
  serverData: Servers | null | undefined;
  kubeInfo: kubeInfoProp;
}
const DetailContent: FC<Props> = ({ serverData, kubeInfo }) => {
  const { isLoading, data } =
    api.kubesRouter.queryDetail.useQuery<InstalledPackageDetail>({
      url: `${serverData?.protocal}://${serverData?.domain}${
        serverData?.port ? ":" + serverData?.port : ""
      }`,
      path: `/apis/core/packages/v1alpha1/installedpackages/plugin/helm.packages/v1alpha1/c/${kubeInfo.cluster}/ns/${kubeInfo.namespace}/${kubeInfo.name}`,
      token: serverData!.kubeToken,
    });

  const router = useRouter();

  const [editorValue, setEditorValue] = useState("");
  const [modifiedValue, setModifiedValue] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!isLoading && data?.installedPackageDetail) {
      try {
        const valuesApplied = data?.installedPackageDetail?.valuesApplied ?? "";
        const originalData = JSON.stringify(JSON.parse(valuesApplied), null, 2);
        setEditorValue(originalData);
        const modifiedValue = JSON.stringify(JSON.parse(originalData));
        setModifiedValue(modifiedValue);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoading]);
  const queryClient = useQueryClient();
  const detailQueryKey = getQueryKey(api.kubesRouter.queryDetail);
  const deployMutation = api.kubesRouter.deploy.useMutation({
    onSuccess: async (res) => {
      console.log("deployMutation res", res);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!res?.installedPackageRef) return;
      router.back();
      await queryClient.invalidateQueries(detailQueryKey);
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorMount = (editor: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const modifiedEditor = editor.getModifiedEditor();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    modifiedEditor.onDidChangeModelContent((_) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      setModifiedValue(modifiedEditor.getValue());
    });
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="h-full w-full">
        <div className="mb-5 flex items-center justify-between gap-6">
          <div className="flex flex-[8] flex-wrap gap-4">
            <Input
              isDisabled
              type="text"
              label="App版本"
              defaultValue={
                data?.installedPackageDetail.currentVersion.appVersion
              }
              className="max-w-[11rem] text-black"
            />
            <Input
              isDisabled
              type="text"
              label="Package版本"
              defaultValue={
                data?.installedPackageDetail.currentVersion.pkgVersion
              }
              className="max-w-[11rem] text-black"
            />
            <Input
              isDisabled
              type="text"
              label="releaseRevision"
              defaultValue={
                data?.installedPackageDetail.customDetail.releaseRevision + ""
              }
              className="max-w-[11rem] text-black"
            />
          </div>
          <div className="flex flex-[2] items-center justify-end gap-4">
            <div
              className={cn(
                "btn btn-primary",
                deployMutation.isLoading && "btn-disabled",
              )}
              onClick={() => {
                deployMutation.mutate({
                  url: `${serverData!.protocal}://${serverData!.domain}${
                    serverData!.port ? ":" + serverData!.port : ""
                  }`,
                  path: `/apis/core/packages/v1alpha1/installedpackages/plugin/helm.packages/v1alpha1/c/${kubeInfo.cluster}/ns/${kubeInfo.namespace}/${kubeInfo.name}`,
                  token: serverData!.kubeToken,
                  data: {
                    ...data?.installedPackageDetail,
                    values: JSON.stringify(JSON.parse(modifiedValue)),
                  },
                });
              }}
            >
              <span
                className={cn(
                  deployMutation.isLoading && "loading loading-spinner",
                )}
              ></span>
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
          original={editorValue}
          modified={editorValue}
          onMount={handleEditorMount}
        />

        <div className="m-6 h-[100vh]">
          <h2 className="mb-4 font-bold text-black">部署说明</h2>
          <Editor
            language="markdown"
            defaultValue={data?.installedPackageDetail.postInstallationNotes}
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

export default DetailContent;
