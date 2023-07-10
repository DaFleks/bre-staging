"use client";

import ImageModal from "@/components/ui/modals/image-modal";
import ContactModal from "@/components/ui/modals/contact-modal";
import ProductModal from "@/components/ui/modals/product-modal";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ImageModal />
      <ContactModal />
      <ProductModal />
    </>
  );
};
export default ModalProvider;
