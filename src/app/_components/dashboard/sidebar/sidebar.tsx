"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const pathName = usePathname();
  useEffect(() => {
    if (pathName) {
      setActiveItem(pathName);
    }
  }, []);
  const handleClick = (item: string) => {
    setActiveItem(item);
  };
  return (
    <div className="mr-6 flex flex-col">
      <div className="avatar placeholder mb-8 flex h-20 w-full items-center justify-start">
        <div className="mr-5 w-20 rounded-full bg-neutral text-neutral-content">
          <span className="text-2xl">LG</span>
        </div>
        <span className="font-sans text-3xl font-bold text-black">
          部署平台
        </span>
      </div>
      <div>
        <ul className="menu menu-lg w-full rounded-box bg-slate-400 p-4">
          <li>
            <Link
              href="/serverManage"
              onClick={() => handleClick("/serverManage")}
              className={activeItem === "/serverManage" ? "active" : ""}
            >
              服务器管理
            </Link>
          </li>
          <li>
            <details open>
              <summary>服务器列表</summary>
              <ul>
                <li>
                  <Link
                    href="/serverList/1"
                    onClick={() => handleClick("/serverList/1")}
                    className={activeItem === "/serverList/1" ? "active" : ""}
                  >
                    服务器1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/serverList/2"
                    onClick={() => handleClick("/serverList/2")}
                    className={activeItem === "/serverList/2" ? "active" : ""}
                  >
                    服务器2
                  </Link>
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
