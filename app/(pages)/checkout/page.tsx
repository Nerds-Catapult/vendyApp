/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l2ode9Z6jYU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { JSX, SVGProps } from 'react';

export default function Component() {
    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 p-4 sm:p-6">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkout</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" placeholder="Enter your address" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Payment Method</Label>
                                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                                    <div>
                                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                        <Label
                                            htmlFor="card"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <CreditCardIcon className="mb-3 h-6 w-6" />
                                            Credit Card
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                                        <Label
                                            htmlFor="paypal"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <WalletCardsIcon className="mb-3 h-6 w-6" />
                                            PayPal
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                                        <Label
                                            htmlFor="apple"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <AppleIcon className="mb-3 h-6 w-6" />
                                            Apple Pay
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="ml-auto">Place Order</Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span>$99.99</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-500">-$10.00</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between font-medium">
                                <span>Total</span>
                                <span>$94.99</span>
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Product Image"
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                    <div className="grid gap-1">
                                        <div className="font-medium">Cozy Hoodie</div>
                                        <div className="text-muted-foreground">Quantity: 1</div>
                                        <div className="font-medium">$49.99</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/placeholder.svg"
                                        alt="Product Image"
                                        width={64}
                                        height={64}
                                        className="rounded-md"
                                    />
                                    <div className="grid gap-1">
                                        <div className="font-medium">Comfy Sweatpants</div>
                                        <div className="text-muted-foreground">Quantity: 1</div>
                                        <div className="font-medium">$49.99</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function AppleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
    );
}

function CreditCardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );
}

function WalletCardsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
            <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
        </svg>
    );
}
