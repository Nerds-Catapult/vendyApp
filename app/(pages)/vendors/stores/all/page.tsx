/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HhM5vEFJCzd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { useState, useMemo, JSX, SVGProps } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import Image from 'next/image';

export default function Component() {
    const stores = [
        {
            id: 1,
            name: 'Acme Apparel',
            image: '/placeholder.svg',
            description: 'High-quality clothing and accessories',
            location: 'New York, NY',
            category: 'Clothing',
            rating: 4.8,
        },
        {
            id: 2,
            name: 'Bloom Botanicals',
            image: '/placeholder.svg',
            description: 'Unique and sustainable plant-based products',
            location: 'Los Angeles, CA',
            category: 'Home & Garden',
            rating: 4.6,
        },
        {
            id: 3,
            name: 'Tech Emporium',
            image: '/placeholder.svg',
            description: 'The latest gadgets and electronics',
            location: 'Chicago, IL',
            category: 'Electronics',
            rating: 4.7,
        },
        {
            id: 4,
            name: 'Gourmet Delights',
            image: '/placeholder.svg',
            description: 'Artisanal and specialty food products',
            location: 'Seattle, WA',
            category: 'Food & Beverage',
            rating: 4.9,
        },
        {
            id: 5,
            name: 'Eco Emporium',
            image: '/placeholder.svg',
            description: 'Sustainable and eco-friendly home goods',
            location: 'Austin, TX',
            category: 'Home & Garden',
            rating: 4.5,
        },
        {
            id: 6,
            name: 'Wellness Oasis',
            image: '/placeholder.svg',
            description: 'Natural health and beauty products',
            location: 'Miami, FL',
            category: 'Health & Beauty',
            rating: 4.8,
        },
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const filteredStores = useMemo(() => {
        return stores
            .filter((store) => {
                return (
                    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    store.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
            })
            .sort((a, b) => {
                if (sortBy === 'rating') {
                    return b.rating - a.rating;
                } else if (sortBy === 'location') {
                    return a.location.localeCompare(b.location);
                } else if (sortBy === 'category') {
                    return a.category.localeCompare(b.category);
                } else {
                    return 0;
                }
            })
            .filter((store) => {
                if (filterBy === '') {
                    return true;
                } else {
                    return store.category === filterBy;
                }
            });
    }, [searchTerm, sortBy, filterBy]);
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-12 px-6">
                <div className="container mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold">All Stores</h1>
                        <div className="flex items-center gap-4">
                            <Input
                                type="text"
                                placeholder="Search stores..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-background text-foreground"
                            />
                            <Select
                                value={sortBy}
                                className="bg-background text-foreground"
                                // @ts-ignore
                                onValueChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                            >
                                <option value="">Sort by</option>
                                <option value="rating">Rating</option>
                                <option value="location">Location</option>
                                <option value="category">Category</option>
                            </Select>
                            <Select
                                value={filterBy}
                                // @ts-ignore
                                className="bg-background text-foreground"
                                // @ts-ignore
                                onValueChange={(e) => setFilterBy(e.target.value)}
                            >
                                <option value="">Filter by category</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home & Garden">Home & Garden</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Food & Beverage">Food & Beverage</option>
                                <option value="Health & Beauty">Health & Beauty</option>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredStores.map((store) => (
                            <div key={store.id} className="bg-background rounded-lg shadow-lg overflow-hidden">
                                <Image
                                    src="/placeholder.svg"
                                    alt={store.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                                    <p className="text-muted-foreground mb-4">{store.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{store.location}</span>
                                        <div className="flex items-center gap-1 text-primary">
                                            <StarIcon className="h-5 w-5" />
                                            <span>{store.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="bg-muted text-muted-foreground py-8 px-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Contact
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            Terms of Service
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link href="#" className="hover:text-primary" prefetch={false}>
                                <TwitterIcon className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="hover:text-primary" prefetch={false}>
                                <FacebookIcon className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="hover:text-primary" prefetch={false}>
                                <InstagramIcon className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );
}
