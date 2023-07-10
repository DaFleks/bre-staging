import { create } from "zustand";

const useSheetStore = create((set) => ({
  navOpen: false,
  toggleNav: () => set((state: any) => ({ navOpen: !state.navOpen })),
  cartOpen: false,
  toggleCart: () => set((state: any) => ({ cartOpen: !state.cartOpen })),
}));

export default useSheetStore;
