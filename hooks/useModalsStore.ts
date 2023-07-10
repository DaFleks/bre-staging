import { create } from "zustand";

const useModalsStore = create((set) => ({
  image: { src: "", alt: "", isOpen: false },
  setImage: (obj: any) =>
    set((state: any) => ({ image: { src: obj.src, alt: obj.alt, isOpen: obj.isOpen } })),

  contactOpen: false,
  contactToggle: () => set((state: any) => ({ contactOpen: !state.contactOpen })),

  productOpen: false,
  productToggle: () => set((state: any) => ({ productOpen: !state.productOpen })),
  editProduct: null,
  setEditProduct: (product: any) => set((state: any) => ({ editProduct: product })),
}));

export default useModalsStore;
