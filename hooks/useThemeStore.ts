import { create } from "zustand";

const useThemeStore = create((set) => ({
  dark: false,
  toggle: () => set((state: any) => ({ dark: !state.dark })),
}));

export default useThemeStore;
