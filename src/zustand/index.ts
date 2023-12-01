import { create } from "zustand";

export const useServerListStore = create((set) => ({
  serverList: [],
  updateServerList: (serverList) => set({ serverList }),
}));
