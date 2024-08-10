"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoveVerticalIcon,
  Package2Icon,
  PackageIcon,
} from "@/components/ui/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import LoadingComponent from "@/components/ui/loading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ExpectedAsCloudinaryResponse,
  ExpectedAsProductTypes,
  ExpectedAStoreCategory as ProductTypes,
} from "@/app/types/foreignTypes";

import { exportedAsProductProps } from "@/app/types/exportedTypes";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import e from "express";
export default function Component() {
  const [products, setProducts] = useState<ExpectedAsProductTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [storeDetails, setStoreDetails] = useState<[]>([]);
  const [productCategory, setProductCategory] = useState<ProductTypes[]>([]);
  const [storeId, setStoreId] = useState<number>(11);
  const [fileData, setFileData] = useState<File | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<exportedAsProductProps>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    quantity: 0,
    categoryName: "",
    storeId: storeId,
  });

  async function fetchProducts() {
    const response = await fetch(
      `https://goose-merry-mollusk.ngrok-free.app/api/products/many/${storeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    setProducts(data);
  }
  type HTMLChanges = React.ChangeEvent<HTMLInputElement> &
    React.ChangeEvent<HTMLTextAreaElement>;

  const fetchStoreDetails = async () => {
    const response = await fetch(
      `https://goose-merry-mollusk.ngrok-free.app/api/stores/${storeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    setStoreDetails(data);
  };

  const fetchStoreCategories = async () => {
    try {
      const response = await fetch(
        "https://goose-merry-mollusk.ngrok-free.app/api/store-category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data: ProductTypes[] = await response.json();
      if (data) {
        setProductCategory(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStoreCategories();
    fetchStoreDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: HTMLChanges) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileData(e.target.files[0]);
    }
  };

  const handeCategoryChange = (val: string) => {
    setFormData({
      ...formData,
      categoryName: val,
    });
  };

  const uploadImageToCloudinary = async (
    file: File,
  ): Promise<ExpectedAsCloudinaryResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://goose-merry-mollusk.ngrok-free.app/api/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );
        const data: ExpectedAsCloudinaryResponse = await response.json();
        if (data) {
          resolve(data);
        } else {
          reject("An error occurred while uploading the image");
        }
      } catch (error) {
        reject("An error occurred while uploading the image");
      }
    });
  };

  const uploadProductImage =
    async (): Promise<ExpectedAsCloudinaryResponse> => {
      return new Promise(async (resolve, reject) => {
        if (fileData) {
          uploadImageToCloudinary(fileData)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject("Please select an image to upload");
        }
      });
    };

  const invokeImageDelete = async (
    publicId: string,
  ): Promise<ExpectedAsCloudinaryResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://goose-merry-mollusk.ngrok-free.app/api/image/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publicId }),
          },
        );
        const data: ExpectedAsCloudinaryResponse = await response.json();
        if (data) {
          resolve(data);
        } else {
          reject("An error occurred while deleting the image");
        }
      } catch (error) {
        reject("An error occurred while deleting the image");
      }
    });
  };

  const CreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { secure_url, public_id } = await uploadProductImage();
    if (!secure_url || secure_url === "") {
      toast.error("An error occurred while uploading the image");
    }
    const productData = {
      ...formData,
      productImage: secure_url,
    };
    try {
      const respnse = await fetch(
        "https://goose-merry-mollusk.ngrok-free.app/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        },
      );
      const data = await respnse.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the product");
      invokeImageDelete(public_id);
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <Link href="#" className="lg:hidden" prefetch={false}>
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <nav className="flex items-center gap-4">
            <Link href="#" className="font-semibold" prefetch={false}>
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Customers
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Analytics
            </Link>
          </nav>
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
      <div className="flex flex-1 gap-4 p-4 md:gap-8 md:p-6">
        <div className="hidden border-r bg-muted/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link
                href="#"
                className="flex items-center gap-2 font-semibold"
                prefetch={false}
              >
                <Package2Icon className="h-6 w-6" />
                <span className="">Vendy Marketplace</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              {/* <nav className="grid items-start px-4 text-sm font-medium">
                {productCategory.map((category) => (
                  <Link
                    key={category.id}
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                  >
                    <PackageIcon className="h-4 w-4" />
                    {category.name}
                  </Link>
                ))}
              </nav> */}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="border shadow-sm rounded-lg">
            <div className="p-6 grid gap-4">
              <form className="grid gap-6" onSubmit={CreateProduct}>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <div>
                    <div className="grid gap-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        name="productName"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productDescription">Description</Label>
                      <Textarea
                        id="productDescription"
                        name="productDescription"
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      <div className="grid gap-2">
                        <Label htmlFor="productPrice">Price</Label>
                        <Input
                          id="productPrice"
                          name="productPrice"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData({
                              ...formData,
                              productPrice: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={handeCategoryChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select store category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategory.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Stock</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData({
                            ...formData,
                            quantity: parseInt(e.target.value),
                          })
                        }
                      />
                      <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" type="submit">
                        Add Product
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.productImage}
                        width="64"
                        height="64"
                        alt={product.productName}
                        className="aspect-square rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.productName}
                    </TableCell>
                    <TableCell>{product.productDescription}</TableCell>
                    <TableCell>${product.productPrice.toFixed(2)}</TableCell>
                    <TableCell>{product.productCategory}</TableCell>
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
