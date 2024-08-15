'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExpectedAsProductTypes } from '@/app/types/foreignTypes';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/reducers/actions';

export default function Page({ params }: any) {
    const [products, setProducts] = useState<ExpectedAsProductTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [storeId, setStoreId] = useState<number>(params.storeid);

    const dispatch = useDispatch();

    const handleAddToCart = (product: ExpectedAsProductTypes) => {
        dispatch(addToCart(product));
    };

    async function fetchProducts() {
        const response = await fetch(`https://vendy-server.onrender.com/api/products/many/${storeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        setLoading(true);
        fetchProducts().then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeId]);

    const featuredProducts = products?.filter((product) => !product?.featured);
    const regularProducts = products?.filter((product) => !product.featured);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">No Products Available</h1>
                    <p className="text-lg text-muted-foreground">
                        We’re sorry, but there are currently no products available in this store.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Welcome to Our Store</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
                <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                    <CarouselContent>
                        {featuredProducts.map((product) => (
                            <CarouselItem key={product.id}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <Image
                                            src={product.productImage}
                                            alt={product.productName}
                                            width={500}
                                            height={500}
                                            className="object-cover"
                                        />
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-start">
                                        <h3 className="font-semibold">{product.productName}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            ${product.productPrice.toFixed(2)}
                                        </p>
                                        <Button className="mt-2" onClick={() => handleAddToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">All Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {regularProducts.map((product) => (
                        <Card key={product.id}>
                            <CardHeader>
                                <Image
                                    src={product.productImage}
                                    alt={product.productName}
                                    width={200}
                                    height={200}
                                    className="object-cover w-full h-48"
                                />
                            </CardHeader>
                            <CardContent>
                                <CardTitle>{product.productName}</CardTitle>
                                <p className="text-muted-foreground">${product.productPrice.toFixed(2)}</p>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
