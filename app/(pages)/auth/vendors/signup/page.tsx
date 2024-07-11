
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="w-full min-h-dvh flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
        <div className="container px-4 md:px-6 text-center text-white">
          <div className="max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Become a Vendor on Our Marketplace
            </h1>
            <p className="text-lg md:text-xl">
              Join our vibrant community of vendors and start selling your
              products to a wide audience.
            </p>
            <div>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-white text-[#6366f1] font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6366f1]"
                prefetch={false}
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="signup-form" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Create Your Vendor Account
            </h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  required
                />
              </div>
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  type="text"
                  placeholder="Enter your business name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="Enter your website URL"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            < p className="mt-4 text-center text-sm text-muted-foreground" >
              Already have an account?{" "}
              <Link href="/auth/vendors/signin" className="text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
