"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useMenuListStore } from "~/zustand";

export interface menuItemProp {
  path: string;
  text: string;
  children: menuItemProp[] | undefined;
}
const menuList: menuItemProp[] = [
  {
    path: "/serverManage",
    text: "服务器管理",
    children: [],
  },
  {
    path: "/serverList",
    text: "服务器列表",
    children: [],
  },
];
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const { data, isLoading, error } = api.serversRouter.getAll.useQuery();

  const updateMenuList = useMenuListStore((state) => state.updateMenuList);

  const pathName = usePathname();
  useEffect(() => {
    if (pathName) {
      setActiveItem(pathName);
    }
  }, [pathName]);
  const handleClick = (item: string) => {
    setActiveItem(item);
  };
  if (error) return "An error has occurred: " + error.message;
  if (data?.length) {
    const serverListItem = menuList.find((i) => i.path === "/serverList");
    if (serverListItem) {
      serverListItem.children = data?.map((item) => {
        return {
          path: item.id,
          text: item.name,
          children: [],
        };
      });
    }
    updateMenuList(menuList);
  }

  return (
    <div className=" mr-6 flex min-w-[220px] flex-col items-center">
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
            {menuList.map((item) => {
              return (
                <li key={item.path}>
                  {!item.children?.length ? (
                    <Link
                      href={`${item.path}?text=${item.text}`}
                      onClick={() => handleClick(item.path)}
                      className={activeItem === item.path ? "active" : ""}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <details open>
                      <summary>{item.text}</summary>
                      <ul>
                        {item.children.map((i) => {
                          return (
                            <li key={i.path}>
                              <Link
                                href={`${item.path}/${i.path}?text=${i.text}`}
                                onClick={() =>
                                  handleClick(`${item.path}/${i.path}`)
                                }
                                className={
                                  activeItem === `${item.path}/${i.path}`
                                    ? "active"
                                    : ""
                                }
                              >
                                {i.text}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
