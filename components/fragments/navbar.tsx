"use client";

import {
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
  XIcon,
  MinusIcon,
  MountainIcon,
  PlusIcon,
} from "lucide-react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { ValidationAuthProps } from "@/app/types/foreignTypes";
import { Store } from '../../app/types/foreignTypes';

export default function Component() {
  const [vendor, setVendor] = useState<boolean>(false);
  const [storeToken, setStoreToken] = useState(Cookies.get("storeToken"));

  const validateVendorToken = async (): Promise<ValidationAuthProps> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://goose-merry-mollusk.ngrok-free.app/api/auth/validate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storeToken}`,
            },
          },
        );
        const data: ValidationAuthProps = await response.json();
        console.log(data);
        if (data.statusCode === 200) {
          resolve(data);
        } else if (data.statusCode === 401) {
          Cookies.remove("storeToken");
        }
      } catch (error) {
        reject("An error occurred while validating the token");
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (storeToken) {
      validateVendorToken()
        .then((data) => {
          if (data.statusCode === 200) {
            setVendor(true);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeToken]);

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex items-center h-16 px-4 md:px-6">
        <Link href="/" className="mr-6 md:mr-10" prefetch={false}>
          <div className="flex items-center gap-2">
            <Image src="/logo.jpeg" alt="vendy logo" width={150} height={150} />
          </div>
        </Link>
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-md hover:bg-muted"
            prefetch={false}
          >
            Home
          </Link>

          <Link
            href="/vendors/all"
            className="px-4 py-2 rounded-md hover:bg-muted"
            prefetch={false}
          >
            {/* Stores */}
          </Link>
          <Link
            href={vendor ? "/auth/vendors/dashboard" : "/auth/vendors/signup"}
            className="px-4 py-2 rounded-md hover:bg-muted"
            prefetch={false}
          >
            {vendor ? "My store" : "Create Store"}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="sr-only">Cart</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-full max-w-md">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b p-4">
                  <h3 className="text-lg font-medium">Your Cart</h3>
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <XIcon className="h-6 w-6" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </DrawerClose>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">Product Name</h4>
                      <p className="text-muted-foreground">$19.99</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span>1</span>
                      <Button variant="ghost" size="icon">
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">Another Product</h4>
                      <p className="text-muted-foreground">$29.99</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span>2</span>
                      <Button variant="ghost" size="icon">
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-t p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">$49.98</span>
                  </div>
                  <Button className="w-full">Proceed to Checkout</Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          {/* only shown on smaller devices */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b p-4">
                  <Link
                    href="#"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <span className="font-medium">Vendy MarketPlace</span>
                  </Link>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <XIcon className="h-6 w-6" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-2 p-4">
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    Stores List
                  </Link>
                  <Link
                    href={
                      vendor
                        ? "/auth/vendors/dashboard"
                        : "/auth/vendors/signup"
                    }
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    {vendor ? "My store" : "Create Store"}
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    Home
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
