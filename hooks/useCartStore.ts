import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      setItems: (items: any) => set((state: any) => ({ items: items })),
    }),
    { name: "cart", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCartStore;
