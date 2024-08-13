'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { JSX, SVGProps, useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

import { ExpectedAsCustomerTypes, ValidationAuthProps } from '@/app/types/foreignTypes';
import toast from 'react-hot-toast';

export default function Component() {
    const [data, setData] = useState<ExpectedAsCustomerTypes | null>(null);
    const [authToken] = useState(Cookies.get('customerToken'));
    const [loading, setLoading] = useState(false);

    const ValidateAuthToken = async (): Promise<ValidationAuthProps> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('https://goose-merry-mollusk.ngrok-free.app/api/auth/validate', {
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

    const fetchCustomerProfile = async () => {
        setLoading(true);
        const response = await fetch('https://goose-merry-mollusk.ngrok-free.app/api/auth/customer', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data: ExpectedAsCustomerTypes = await response.json();
        if (response.ok) {
            setData(data);
        } else {
            toast.error('session expired, please login again');
            Cookies.remove('customerToken');
        }
    };

    useEffect(() => {
        ValidateAuthToken()
            .then((data) => {
                if (data.statusCode !== 200) {
                    Cookies.remove('customerToken');
                    window.location.href = '/auth/customers/signin';
                } else {
                    fetchCustomerProfile();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    return (
        <div className="w-full max-w-4xl mx-auto py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 md:mb-12">
                <div className="flex-shrink-0">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32">
                        <AvatarFallback>
                            {
                                // @ts-ignore
                                data?.data?.firstName?.charAt(0).toUpperCase() +
                                    // @ts-ignore
                                    data?.data.lastName?.charAt(0).toUpperCase() || 'A'
                            }
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {data?.data.firstName + ' ' + data?.data.lastName}
                    </h1>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <MailIcon className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="font-medium">Email</div>
                                <div className="text-muted-foreground">{data?.data.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="font-medium">Phone</div>
                                <div className="text-muted-foreground">{data?.data.phone}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <LocateIcon className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="font-medium">Address</div>
                                <div className="text-muted-foreground">123 Main St, Anytown USA</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-4">Account Details</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="font-medium">Joined</div>
                            <div className="text-muted-foreground">{data?.data.createdAt.split('T')[0]}</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Order History</h2>
                    {data?.data.customer.orders ? (
                        <div className="text-muted-foreground text-center">No orders yet</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data?.data?.customer?.orders?.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                                >
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Order Number</div>
                                        <div className="text-lg font-semibold">{order.orderNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Status</div>
                                        <div className="text-lg font-semibold">{order.orderStatus}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function LocateIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <line x1="2" x2="5" y1="12" y2="12" />
            <line x1="19" x2="22" y1="12" y2="12" />
            <line x1="12" x2="12" y1="2" y2="5" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <circle cx="12" cy="12" r="7" />
        </svg>
    );
}

function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function PhoneIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
