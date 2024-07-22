"use client";

import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  label: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function Component() {
  const categories: Category[] = [
    { id: "clothing", label: "Clothing" },
    { id: "electronics", label: "Electronics" },
    { id: "home", label: "Home" },
    { id: "toys", label: "Toys" },
    { id: "books", label: "Books" },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Cozy Sweater",
      description: "A soft and warm sweater perfect for the winter",
      price: 49.99,
      category: "clothing",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "High-quality noise-cancelling headphones",
      price: 99.99,
      category: "electronics",
    },
    {
      id: 3,
      name: "Plush Throw Blanket",
      description: "A luxurious and soft throw blanket for your living room",
      price: 29.99,
      category: "home",
    },
    {
      id: 4,
      name: "Wooden Building Blocks",
      description: "Durable and colorful building blocks for kids",
      price: 19.99,
      category: "toys",
    },
    {
      id: 5,
      name: "Classic Hardcover Novel",
      description: "A timeless literary masterpiece",
      price: 14.99,
      category: "books",
    },
    {
      id: 6,
      name: "Smart Home Hub",
      description: "Control your smart home devices with this hub",
      price: 79.99,
      category: "electronics",
    },
    {
      id: 7,
      name: "Decorative Throw Pillow",
      description: "Add a touch of style to your living space",
      price: 24.99,
      category: "home",
    },
    {
      id: 8,
      name: "Educational Board Game",
      description: "A fun and engaging game for the whole family",
      price: 39.99,
      category: "toys",
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "price") {
          return a.price - b.price;
        }
        return 0;
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={category.id} className="ml-2">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Products</h2>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
