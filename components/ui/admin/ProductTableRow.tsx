"use client";

import Image from "next/image";

import useModalsStore from "@/hooks/useModalsStore";

import { EditIcon, TrashIcon } from "lucide-react";
import { TableCell, TableRow } from "../table";
import { Checkbox } from "../checkbox";
import { Button } from "../button";

interface ProductTableRowProps {
  _id: string;
  image: string;
  title: string;
  sku: string;
  stock: number;
  description:string;
  price: number;
  isActive: boolean;
  updatedAt: string;
  toggleIsActive: (_id: string) => void;
  deleteProduct: (_id: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  _id,
  image,
  title,
  sku,
  stock,
  description,
  price,
  isActive,
  updatedAt,
  deleteProduct,
  toggleIsActive,
}) => {
  //  Hooks
  const productToggle = useModalsStore((state: any) => state.productToggle);
  const setEditProduct = useModalsStore((state: any) => state.setEditProduct);
  const setImage = useModalsStore((state: any) => state.setImage);

  //  Handlers
  const handleEdit = () => {
    setEditProduct({
      _id: _id,
      image: image,
      title: title,
      sku: sku,
      stock: stock,
      description: description,
      price: price,
      isActive: isActive,
    });
    productToggle();
  };

  const handleDelete = () => {
    deleteProduct(_id);
  };

  const handleIsActive = () => {
    toggleIsActive(_id);
  };

  const handleImage = () => {
    setImage({ src: image, alt: title, isOpen: true });
  };

  return (
    <TableRow>
      <TableCell>
        <div
          onClick={handleImage}
          className="relative w-24 h-24 bg-gray-200 rounded-lg hover:cursor-pointer"
        >
          <Image className="p-3" src={image} alt={title} fill style={{ objectFit: "contain" }} />
        </div>
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell className="text-center">{sku}</TableCell>
      <TableCell className="text-center">{stock}</TableCell>
      <TableCell className="text-center">${price.toFixed(2)}</TableCell>
      <TableCell className="text-center">
        <Checkbox id="isActive" checked={isActive} onCheckedChange={handleIsActive} />
      </TableCell>
      <TableCell>{new Date(`${updatedAt}`).toLocaleString()}</TableCell>
      <TableCell className="text-center">
        <Button onClick={handleEdit} variant="ghost">
          <EditIcon className="w-4 h-4" />
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button variant="ghost" onClick={handleDelete}>
          <TrashIcon className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default ProductTableRow;
