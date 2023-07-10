"use client";

import Image from "next/image";

import useCartStore from "@/hooks/useCartStore";
import useSheetStore from "@/hooks/useSheetStore";

import { ArrowRightSquareIcon, MinusIcon, PlusIcon, Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import CustomSheet from "@/components/ui/custom-sheet";

const CartSheet = () => {
  //  Hooks
  const open = useSheetStore((state: any) => state.cartOpen);
  const toggle = useSheetStore((state: any) => state.toggleCart);

  const items = useCartStore((state: any) => state.items);
  const setItems = useCartStore((state: any) => state.setItems);

  // Handlers
  const handleAddItem = (id: string) => {
    const itemsCopy = [...items];
    const idx = itemsCopy.findIndex((item: any) => item.id === id);

    itemsCopy[idx].qty += 1;
    itemsCopy[idx].price += itemsCopy[idx].basePrice;
    setItems(itemsCopy);
  };

  const handleSubItem = (id: string) => {
    const itemsCopy = [...items];
    const idx = itemsCopy.findIndex((item: any) => item.id === id);

    itemsCopy[idx].qty -= 1;

    if (itemsCopy[idx].qty < 1) {
      setItems(itemsCopy.filter((item) => item.id !== id));
      return;
    }

    itemsCopy[idx].price -= itemsCopy[idx].basePrice;
    setItems(itemsCopy);
  };

  const handleDeleteItem = (id: string) => {
    let itemsCopy = [...items];
    const qty = itemsCopy.find((item) => item.id === id).qty;
    itemsCopy = itemsCopy.filter((item) => item.id !== id);
    setItems(itemsCopy);
  };

  //  Values
  const nItems = Object.values(items as Number).reduce((total, { qty }) => total + qty, 0);
  const subtotal = Object.values(items as Number).reduce((total, { price }) => total + price, 0);

  return (
    <CustomSheet
      open={open}
      onOpenChange={toggle}
      title="Cart"
      description={`Number of items: ${nItems}`}
    >
      {items && (
        <>
          {items.map((item: any) => (
            <>
              <div className="flex items-center justify-between space-x-3 p-3">
                <div className="flex items-center min-w-28 gap-3">
                  <div className="relative h-[100px] w-[100px] min-w-[100px] min-h-[100px] bg-gray-200 rounded-lg">
                    <Image
                      className="p-3"
                      src={`${item.image ? item.image : "/thumbnail.jpg"}`}
                      alt={item.title}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="overflow-hidden select-none">
                    <h1 className="text-lg font-semibold break-all">{item.title}</h1>
                    <p className="text-xs mb-3">SKU: {item.sku}</p>
                    <p className="font-semibold text-amber-700 mb-3">${item.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between w-[125px] overflow-hidden">
                      <button
                        onClick={() => {
                          handleSubItem(item.id);
                        }}
                        className="border rounded p-1 hover:bg-slate-100"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <p>{item.qty}</p>
                      <button
                        onClick={() => {
                          handleAddItem(item.id);
                        }}
                        className="border rounded p-1 hover:bg-slate-100"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    handleDeleteItem(item.id);
                  }}
                  size="icon"
                  variant="outline"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
            </>
          ))}
        </>
      )}
      <div className="h-[50px]"></div>
      <div className="fixed h-[75px] bottom-0 right-0 mr-[14px] flex items-center pr-3">
        <Button className="float-right py-6 shadow-md shadow-gray-500">
          <ArrowRightSquareIcon />
          &#160;&#160;Checkout:&#160;${subtotal.toFixed(2)}
        </Button>
      </div>
    </CustomSheet>
  );
};
export default CartSheet;
