"use client";

import React, { useState, useRef, useCallback } from "react";
import { ProductCatalogProps, Product, brands } from "@/app/types";
import Image from "next/image";

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  categories,
  brands,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(6); // Initially load 6 products
  const observer = useRef<IntersectionObserver | null>(null);

  const lastProductElementRef = useCallback((node: Element) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6); // Load 6 more products
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const handleCategoryChange = (category: string) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    }
  };

  const handleAllCategoriesChange = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...categories]);
    }
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((product) =>
          selectedCategories.includes(product.category)
        );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.length === categories.length}
              onChange={handleAllCategoriesChange}
              className="form-checkbox"
            />
            <span className="ml-2">All</span>
          </label>
        </div>
        {categories.map((category) => (
          <div key={category} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="form-checkbox"
              />
              <span className="ml-2">{category}</span>
            </label>
          </div>
        ))}
        {/* brands filter */}
        <h2 className="text-xl font-bold mb-4">Brands</h2>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.length === categories.length}
              onChange={handleAllCategoriesChange}
              className="form-checkbox"
            />
            <span className="ml-2">All</span>
          </label>
        </div>
        {brands &&
          brands.map((brand) => (
            <div key={brand.brandName} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(brand.brandName)}
                  onChange={() => handleCategoryChange(brand.brandName)}
                  className="form-checkbox"
                />
                <span className="ml-2">{brand.brandName}</span>
              </label>
            </div>
          ))}
      </div>
      <div className="md:w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.slice(0, visibleProducts).map((product, index) => {
            if (index === visibleProducts - 1) {
              return (
                <div
                  ref={lastProductElementRef as any}
                  key={product.id}
                  className="border p-4"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={300}
                    width={300}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  {/* Add other product details */}
                </div>
              );
            } else {
              return (
                <div key={product.id} className=" p-4 ">
                  <Image
                    src={"https://shorturl.at/nvwCD"}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 "
                          width={300}
                          height={300}
                  />
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-500 mb-2">{product.category}</p>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
