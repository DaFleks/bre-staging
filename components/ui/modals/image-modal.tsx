"use client";

import Image from "next/image";

import useModalsStore from "@/hooks/useModalsStore";

import Modal from "../modal";

const ImageModal = () => {
  //  Hooks
  const image = useModalsStore((state: any) => state.image);
  const setImage = useModalsStore((state: any) => state.setImage);

  return (
    <Modal
      open={image.isOpen}
      onOpenChange={() => {
        setImage({ src: "", alt: "", isOpen: false });
      }}
    >
      <div className="relative h-[500px]">
        <Image src={image.src} alt={image.alt} fill style={{ objectFit: "contain" }} />
      </div>
    </Modal>
  );
};
export default ImageModal;
