"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useSheetStore from "@/hooks/useSheetStore";
import useThemeStore from "@/hooks/useThemeStore";
import useModalsStore from "@/hooks/useModalsStore";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import CartSheet from "@/components/ui/sheets/cart-sheet";

import {
  FlameIcon,
  HelpCircleIcon,
  MessageSquare,
  MoonStar,
  SettingsIcon,
  ShoppingCartIcon,
} from "lucide-react";

const Navbar = () => {
  //  Hooks
  const router = useRouter();
  const toggleCart = useSheetStore((state: any) => state.toggleCart);
  const dark = useThemeStore((state: any) => state.dark);
  const toggleDark = useThemeStore((state: any) => state.toggle);
  const contactToggle = useModalsStore((state: any) => state.contactToggle);

  //  Effects
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <>
      <nav className={`border-b flex items-center h-16 dark:bg-neutral-950 z-50`}>
        <Container leftRight upDown>
          <div className="flex justify-between items-center">
            <Link href="/" className="font-bold text-sm flex items-center hover:text-amber-600">
              <FlameIcon className="h-4 w-4" />
              <span className="block mt-1">&#160;&#160;BRE Racing</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Button size="icon" variant="ghost" onClick={toggleCart}>
                <ShoppingCartIcon className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => router.push("/admin/dashboard/products")}
              >
                <SettingsIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={contactToggle}>
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={toggleDark}>
                <MoonStar className="h-4 w-4" />
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </Container>
      </nav>
      <CartSheet />
    </>
  );
};

export default Navbar;
