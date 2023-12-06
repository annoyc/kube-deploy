import type { Servers } from "@prisma/client";
import { create } from "zustand";
import type { menuItemProp } from "~/app/(root)/dashboard/sidebar/sidebar";

interface useMenuListStoreProps {
  menuListStore: menuItemProp[];
  updateMenuList: (menuListStore: menuItemProp[]) => void;
}

interface useCurrentServerStoreProps {
  currentServer: Servers | null;
  updateCurrentServer: (currentServer: Servers) => void;
}

export const useMenuListStore = create<useMenuListStoreProps>()((set) => ({
  menuListStore: [],
  updateMenuList: (menuListStore) => set({ menuListStore }),
}));

export const useCurrentServerStore = create<useCurrentServerStoreProps>()(
  (set) => ({
    currentServer: null,
    updateCurrentServer: (currentServer) => set({ currentServer }),
  }),
);
