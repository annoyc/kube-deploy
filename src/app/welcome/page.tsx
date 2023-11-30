import Link from "next/link";
import { FunctionComponent } from "react";
import { getServerAuthSession } from "~/server/auth";

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 font-sans text-3xl text-black">
      <div>欢迎使用kubeapp部署平台</div>
      {!session?.user && (
        <Link
          href={"/api/auth/signin"}
          className="btn btn-neutral w-80 rounded-2xl"
        >
          请登录
        </Link>
      )}
    </div>
  );
};

export default Welcome;
