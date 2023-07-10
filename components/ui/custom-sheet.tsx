"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
} from "@/components/ui/sheet";
import Container from "../Container";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface CustomSheetProps {
  open: boolean;
  onOpenChange: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const CustomSheet: React.FC<CustomSheetProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full !max-w-[40rem] overflow-y-scroll" side="right">
        <SheetHeader className="text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
export default CustomSheet;
