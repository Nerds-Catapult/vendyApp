

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";


import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex items-center h-16 px-4 md:px-6">
        <Link href="#" className="mr-6 md:mr-10" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
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
            href="#"
            className="px-4 py-2 rounded-md hover:bg-muted"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="px-4 py-2 rounded-md hover:bg-muted"
            prefetch={false}
          >
            Run Errands
          </Link>
          <Link
            href="#"
            className="px-4 py-2 rounded-md hover:bg-muted"
            prefetch={false}
          >
            Create a Vendor Account
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="sr-only">Cart</span>
          </Button>
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
                    <MountainIcon className="h-6 w-6" />
                    <span className="font-medium">Acme Inc</span>
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
                    New
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    Clothing
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    Accessories
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="px-4 py-2 rounded-md hover:bg-muted"
                    prefetch={false}
                  >
                    Beauty
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

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
