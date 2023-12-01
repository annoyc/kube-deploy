"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { api } from "~/trpc/react";

const Sidebar = memo(() => {
  const [activeItem, setActiveItem] = useState("");

  const { data, isLoading, error } = api.serversRouter.getAll.useQuery();

  const pathName = usePathname();
  useEffect(() => {
    if (pathName) {
      setActiveItem(pathName);
    }
  }, []);
  const handleClick = (item: string) => {
    setActiveItem(item);
  };
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="mr-6 flex flex-col items-center">
      <div className="avatar placeholder mb-8 flex h-20 w-full items-center justify-start">
        <div className="mr-5 w-20 rounded-full bg-neutral text-neutral-content">
          <span className="text-2xl">LG</span>
        </div>
        <span className="font-sans text-3xl font-bold text-black">
          部署平台
        </span>
      </div>
      {isLoading ? (
        <span className="loading loading-dots loading-lg h-full text-black"></span>
      ) : (
        <div className="w-full">
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
                  {data.map((item) => {
                    return (
                      <li key={item.id}>
                        <Link
                          href={"/serverList/" + item.id}
                          onClick={() => handleClick(`/serverList/${item.id}`)}
                          className={
                            activeItem === `/serverList/${item.id}`
                              ? "active"
                              : ""
                          }
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sidebar;
