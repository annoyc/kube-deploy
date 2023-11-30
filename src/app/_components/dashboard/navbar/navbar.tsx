import { FunctionComponent } from "react";
import User from "./user/user";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <main className="flex h-20 items-center justify-between px-8 py-8 text-black">
      <div className=" text-3xl font-bold">服务器管理</div>
      <User />
    </main>
  );
};

export default Navbar;
