"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import useCartStore from "@/hooks/useCartStore";
import useModalsStore from "@/hooks/useModalsStore";

interface ProductProps {
  id: string;
  image?: string;
  title: string;
  description: string;
  sku: string;
  price: number;
}

const Product: React.FC<ProductProps> = ({ id, image, title, description, sku, price }) => {
  //  Hooks
  const items = useCartStore((state: any) => state.items);
  const setItems = useCartStore((state: any) => state.setItems);
  const setImage = useModalsStore((state: any) => state.setImage);

  //  Handlers
  const handleAddToCart = () => {
    const itemsCopy = [...items];

    if (itemsCopy.some((item) => item.id === id)) {
      const itemIdx = itemsCopy.findIndex((item) => item.id === id);
      itemsCopy[itemIdx].qty += 1;
      itemsCopy[itemIdx].price += itemsCopy[itemIdx].basePrice;
      setItems([...itemsCopy]);
      return null;
    }

    setItems([...items, { id, image, title, price, sku, qty: 1, basePrice: price }]);
  };

  const handleImage = () => {
    setImage({ src: image, alt: title, isOpen: true });
  };

  return (
    <Card className="flex flex-col overflow-hidden dark:bg-neutral-800">
      <div onClick={handleImage} className="relative h-32 mb-3 bg-gray-200 hover:cursor-pointer">
        <Image
          className="p-3"
          src={image ? image : "/thumbnail.jpg"}
          fill
          style={{ objectFit: "contain" }}
          alt={title}
        />
      </div>
      <CardHeader className="p-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 grow">
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-3 flex flex-col items-start">
        <p className="text-xs mb-3 font-semibold">
          SKU:<span className="font-normal">&#160;{sku}</span>
        </p>
        <CardTitle className="text-md mb-3">${price.toFixed(2)}</CardTitle>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
