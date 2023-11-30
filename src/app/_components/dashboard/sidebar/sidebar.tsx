import { FunctionComponent } from "react";

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  return (
    <div className="mr-6 flex flex-col">
      <div className="avatar placeholder mb-8 flex h-20 w-full items-center justify-start">
        <div className="bg-neutral text-neutral-content mr-5 w-20 rounded-full">
          <span className="text-2xl">LG</span>
        </div>
        <span className="font-sans text-3xl font-bold text-black">
          部署平台
        </span>
      </div>
      <div>
        <ul className="menu menu-lg rounded-box w-full bg-gray-400">
          <li>
            <a className="active">服务器管理</a>
          </li>
          <li>
            <details open>
              <summary>服务器列表</summary>
              <ul>
                <li>
                  <a>服务器1</a>
                </li>
                <li>
                  <a>服务器2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
