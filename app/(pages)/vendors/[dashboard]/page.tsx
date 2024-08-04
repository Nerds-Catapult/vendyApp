"use client";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import {
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  LineChartIcon,
  Package2Icon,
  BellIcon,
  SearchIcon,
  MoveVerticalIcon,
  PlusIcon,
} from "@/components/ui/Icons";


import { useState } from "react";
export default function Component() {

  const [storeId, setStoreId] = useState<number | null>(11);
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <span className="">Vendy</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary  transition-all hover:text-primary"
                prefetch={false}
              >
                <PackageIcon className="h-4 w-4" />
                Products{" "}
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border w-8 h-8"
              >
                <Image
                  src="/placeholder.svg"
                  width="32"
                  height="32"
                  className="rounded-full"
                  alt="Avatar"
                  style={{ aspectRatio: "32/32", objectFit: "cover" }}
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Tabs defaultValue="products">
            <TabsList className="flex items-center gap-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="create">Create Product</TabsTrigger>
              <TabsTrigger value="edit">Edit Product</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <div className="border shadow-sm rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead className="max-w-[150px]">Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Stock
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Image
                          src="/placeholder.svg"
                          width="64"
                          height="64"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Glimmer Lamps
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        Elegant and stylish lamps for your home
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $49.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        500
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveVerticalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Image
                          src="/placeholder.svg"
                          width="64"
                          height="64"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Aqua Filters
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        High-quality water filters for your home
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $29.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        750
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveVerticalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Image
                          src="/placeholder.svg"
                          width="64"
                          height="64"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Eco Planters
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        Sustainable and eco-friendly planters
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $19.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        300
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoveVerticalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create Product</CardTitle>
                  <CardDescription>
                    Fill out the form to create a new product.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" type="text" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" rows={3} />
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" type="number" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Product Images</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          className="aspect-square rounded-md"
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Add image</span>
                        </Button>
                        <Image
                          src="/placeholder.svg"
                          width="84"
                          height="84"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                        <Image
                          src="/placeholder.svg"
                          width="84"
                          height="84"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Create Product</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Product</CardTitle>
                  <CardDescription>
                    Update the product details in the form below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        defaultValue="Glimmer Lamps"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        defaultValue="Elegant and stylish lamps for your home"
                      />
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" defaultValue={49.99} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" type="number" defaultValue={500} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Product Images</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          className="aspect-square rounded-md"
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span className="sr-only">Add image</span>
                        </Button>
                        <Image
                          src="/placeholder.svg"
                          width="84"
                          height="84"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                        <Image
                          src="/placeholder.svg"
                          width="84"
                          height="84"
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Update Product</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
