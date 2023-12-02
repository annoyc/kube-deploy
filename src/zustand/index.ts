import { create } from "zustand";
import { menuItemProp } from "~/app/(root)/dashboard/sidebar/sidebar";

interface useMenuListStoreProps {
  menuListStore: menuItemProp[];
  updateMenuList: (menuListStore: menuItemProp[]) => void;
}

export const useMenuListStore = create<useMenuListStoreProps>()((set) => ({
  menuListStore: [],
  updateMenuList: (menuListStore) => set({ menuListStore }),
}));
