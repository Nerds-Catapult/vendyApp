'use client';

import { MenuIcon, ShoppingCartIcon, SearchIcon, XIcon, MinusIcon, MountainIcon, PlusIcon } from 'lucide-react';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart, updateQuantity } from '@/app/reducers/actions';
import { RootState } from '@/app/store/store';
import {
    ValidationAuthProps,
    ExpectedAsProductTypes as Product,
    checkIfVendorHasStoreReturnsBoolean
} from '@/app/types/foreignTypes';
import CartComponent from './cart';



export default function Component() {
    const [vendor, setVendor] = useState<boolean>(false);
    const [storeToken, setStoreToken] = useState(Cookies.get('storeToken'));
    const [items, totalItems] = useSelector((state: RootState) => state.cart.items);

    const [storeId, setStoreId] = useState<number>();

    const validateAuthToken = async (): Promise<ValidationAuthProps> => {
        try {
            const response = await fetch('https://goose-merry-mollusk.ngrok-free.app/api/auth/validate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storeToken}`,
                },
            });
            const data: ValidationAuthProps = await response.json();
            if (data) {
                return data;
            }
            throw new Error('An error occurred while validating the token');
        } catch (error) {
            console.log(error);
            throw new Error('An error occurred while validating the token');
        }
    };

    useEffect(() => {
        const handleAuth = async () => {
            if (storeToken) {
                try {
                    const authData = await validateAuthToken();
                    if (authData.statusCode === 200) {
                        const storeData = await checkIfVendorHasStore();
                        if (storeData.hasStore) {
                            console.log('Vendor has store');
                            setVendor(true);
                            setStoreId(storeData.storeId);
                        }
                    } else {
                        console.log('Token is invalid');
                        Cookies.remove('storeToken');
                    }
                } catch (error) {
                    console.error(error);
                    Cookies.remove('storeToken');
                }
            } else {
                return null;
            }
        };

        handleAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeToken]);

         const checkIfVendorHasStore = async (): Promise<checkIfVendorHasStoreReturnsBoolean> => {
             return new Promise(async (resolve, reject) => {
                 try {
                     const response = await fetch('https://goose-merry-mollusk.ngrok-free.app/api/auth/hasStore', {
                         method: 'GET',
                         headers: {
                             'Content-Type': 'application/json',
                             Authorization: `Bearer ${storeToken}`,
                         },
                     });
                     const data: checkIfVendorHasStoreReturnsBoolean = await response.json();
                     if (data.hasStore === true) {
                         resolve(data);
                     }
                 } catch (error) {
                     reject('An error occurred while checking if vendor has store');
                 }
             });
         };

    useEffect(() => {
        if (storeToken) {
            
        }
    }, [storeToken]);
    
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const addToCartHandler = (product: Product) => {
        dispatch(addToCart(product));
    };

    const removeFromCartHandler = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const clearCartHandler = () => {
        dispatch(clearCart());
    };



    useEffect(() => {
        if (storeToken) {
            checkIfVendorHasStore()
                .then((data) => {
                    setVendor(true);
                    setStoreId(data.storeId);
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
                    <Link href="/" className="px-4 py-2 rounded-md hover:bg-muted" prefetch={false}>
                        Home
                    </Link>

                    <Link href="/vendors/all" className="px-4 py-2 rounded-md hover:bg-muted" prefetch={false}>
                        Stores
                    </Link>
                    <Link
                        href={vendor ? `/vendors/${storeId}` : '/auth/vendors/signup'}
                        className="px-4 py-2 rounded-md hover:bg-muted"
                        prefetch={false}
                    >
                        {vendor ? 'My store' : 'Create Store'}
                    </Link>
                </nav>
                <div className="ml-auto flex items-center gap-4">
                    <CartComponent />
                    {/* only shown on smaller devices */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-md">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between border-b p-4">
                                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                        <span className="font-medium">Vendy MarketPlace</span>
                                    </Link>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <XIcon className="h-6 w-6" />
                                            <span className="sr-only">Close</span>
                                        </Button>
                                    </SheetClose>
                                </div>
                                <nav className="flex flex-col gap-2 p-4">
                                    <Link href="#" className="px-4 py-2 rounded-md hover:bg-muted" prefetch={false}>
                                        Stores List
                                    </Link>
                                    <Link
                                        href={vendor ? `/vendors/${storeId}` : '/auth/vendors/signup'}
                                        className="px-4 py-2 rounded-md hover:bg-muted"
                                        prefetch={false}
                                    >
                                        {vendor ? 'My store' : 'Create Store'}
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-md hover:bg-muted" prefetch={false}>
                                        FAQ
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-md hover:bg-muted" prefetch={false}>
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
