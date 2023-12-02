import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Page = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <div className="font-sans text-5xl font-extrabold text-black">
        欢迎使用kubeapp部署系统
      </div>
      {!session?.user && (
        <Link
          href={"/api/auth/signin"}
          className="btn-default btn w-40 rounded-3xl"
        >
          开始使用
        </Link>
      )}
    </div>
  );
};

export default Page;
