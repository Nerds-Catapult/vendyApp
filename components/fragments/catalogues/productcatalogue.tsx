'use client';

import { useState, useMemo, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ExpectedAsProductCategory, ExpectedAsProductTypes } from '@/app/types/foreignTypes';
import { RootState } from '@/app/store/store';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart, updateQuantity } from '@/app/reducers/actions';

export default function Component() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categories, setCategories] = useState<ExpectedAsProductCategory[]>([]);
    const [products, setProducts] = useState<ExpectedAsProductTypes[]>([]);
    const [sortBy, setSortBy] = useState<string>('name');

    const dispatch = useDispatch();

    const handleAddToCart = (product: ExpectedAsProductTypes) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Fetch product categories
    const fetchProductCategories = async () => {
        try {
            const response = await fetch('https://vendy-server.onrender.com/api/store-category', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data: ExpectedAsProductCategory[] = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching product categories:', error);
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://vendy-server.onrender.com/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: ExpectedAsProductTypes[] = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchProductCategories();
        fetchProducts();
    }, []);

    // Filter and sort products based on selected categories and sort criteria
    const filteredProducts = useMemo(() => {
        const filtered = products.filter(
            (product) => selectedCategories.length === 0 || selectedCategories.includes(product.productCategory),
        );

        return filtered.sort((a, b) => {
            if (sortBy === 'name') {
                return a.productName.localeCompare(b.productName);
            } else if (sortBy === 'price') {
                return a.productPrice - b.productPrice;
            }
            return 0;
        });
    }, [products, selectedCategories, sortBy]);

    // Handle category selection change
    const handleCategoryChange = (categoryname: string) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(categoryname)
                ? prevCategories.filter((name) => name !== categoryname)
                : [...prevCategories, categoryname],
        );
    };

    // Handle sort option change
    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-8">
            {/* Categories Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold mb-4">Categories</h2>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                            <Checkbox
                                id={category.name}
                                checked={selectedCategories.includes(category.name)}
                                onCheckedChange={() => handleCategoryChange(category.name)}
                            />
                            <Label htmlFor={category.id.toString()} className="ml-2">
                                {category.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Section */}
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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="bg-gray-100 rounded-lg shadow-md p-4">
                                <Image
                                    height={192}
                                    width={256}
                                    src={product.productImage}
                                    alt={product.productName}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-bold mb-2">{product.productName}</h3>
                                <p className="text-gray-600 mb-4">{product.productDescription}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-primary font-bold">${product.productPrice.toFixed(2)}</span>
                                    <Button onClick={() => handleAddToCart(product)} className="px-4 py-2">
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
