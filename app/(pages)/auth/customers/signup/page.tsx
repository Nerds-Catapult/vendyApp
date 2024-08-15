'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import LoadingComponent from '@/components/ui/loading';
import { ValidationAuthProps } from '@/app/types/foreignTypes';

export default function Component() {
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState(Cookies.get('storeToken'));
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    });

    const ValidateAuthToken = async (): Promise<ValidationAuthProps> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('https://vendy-server.onrender.com/api/auth/validate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data: ValidationAuthProps = await response.json();
                if (data) {
                    resolve(data);
                } else {
                    reject('An error occurred while validating the token');
                }
            } catch (error) {
                reject('An error occurred while validating the token');
                console.log(error);
            }
        });
    };

    useEffect(() => {
        setLoading(true);
        ValidateAuthToken()
            .then((data) => {
                if (data.statusCode !== 200) {
                    Cookies.remove('customerToken');
                } else {
                    window.location.href = '/auth/customers/profile';
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        fetch('https://vendy-server.onrender.com/api/auth/customers/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === 201) {
                    Cookies.set('customerToken', data.data.token);
                    window.location.href = '/auth/customers/profile';
                } else {
                    setLoading(false);
                    alert(data.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Create Your Account With Us
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Or{' '}
                        <Link
                            href="/auth/customers/signin"
                            className="font-medium text-primary hover:text-primary/90"
                            prefetch={true}
                        >
                            sign in to your account
                        </Link>
                    </p>
                </div>
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground">
                            Full Name
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="off"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                            />
                            <span></span>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="phone" className="block text-sm font-medium text-muted-foreground">
                            Phone Number
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="phone"
                                name="phone"
                                type="number"
                                autoComplete="off"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-primary/20 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="address" className="block text-sm font-medium text-muted-foreground">
                            Address
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                autoComplete="off"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-primary/20 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                            Email address
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-primary/20 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                            Password
                        </Label>
                        <div className="mt-1">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-primary/20 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember-me"
                                name="remember-me"
                                className="h-4 w-4 rounded text-primary focus:ring-primary"
                            />
                            <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                                Remember me
                            </Label>
                        </div>
                        <div className="text-sm">
                            <Link href="#" className="font-medium text-primary hover:text-primary/90" prefetch={false}>
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
