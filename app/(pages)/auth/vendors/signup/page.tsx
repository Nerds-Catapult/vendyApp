"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import toast from "react-hot-toast";

import LoadingComponent from "@/components/ui/loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  VendorTypeFromServer,
  ValidationAuthProps,
  checkIfVendorHasStoreReturnsBoolean,
} from "@/app/types/foreignTypes";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(Cookies.get("storeToken"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "testing",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    for (let key in formData) {
      if (key === e.target.id) {
        setFormData({ ...formData, [key]: e.target.value });
      }
    }
  };

  const validateAuthToken = async (): Promise<ValidationAuthProps> => {
    const response = await fetch(
      "https://vendy-server.onrender.com/api/auth/validate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("An error occurred while validating the token");
    }
    return await response.json();
  };

  const checkIfVendorHasStore =
    async (): Promise<checkIfVendorHasStoreReturnsBoolean> => {
      const response = await fetch(
        "https://vendy-server.onrender.com/api/auth/hasStore",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("An error occurred while checking if vendor has store");
      }
      return await response.json();
    };

  useEffect(() => {
    setLoading(true);
    const handleAuth = async () => {
      if (authToken) {
        try {
          const authData = await validateAuthToken();
          if (authData.statusCode === 200) {
            const storeData = await checkIfVendorHasStore();
            if (storeData.hasStore) {
              console.log("Vendor has store");
              window.location.href = `/vendors/dashboard/${storeData.storeId}`;
            } else {
              window.location.href = "/auth/vendors/stores/create";
            }
          } else {
            setLoading(false);
            console.log("Token is invalid");
            Cookies.remove("storeToken");
          }
        } catch (error) {
          setLoading(false);
          console.error(error);
          Cookies.remove("storeToken");
        }
      } else {
        setLoading(false);
      }
    };

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { firstName, lastName, email, password, phone } = formData;
      if (!firstName || !lastName || !email || !password || !phone) {
        return;
      }
      setLoading(true);
      const response = await fetch(
        "https://vendy-server.onrender.com/api/vendors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data: VendorTypeFromServer = await response.json();
      if (data) {
        toast.success("Vendor created successfully");
        Cookies.set("storeToken", data.token);
        //refresh the page
        window.location.href = "/auth/vendors/stores/create";
      } else {
        toast.error("An error occurred while creating the vendor, try again");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while creating the vendor, try again");
      console.log(error);
    }
  };

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
                className={classNames(
                  "inline-flex items-center justify-center h-10 px-6 rounded-md bg-white text-[#6366f1] font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6366f1]",
                  { hidden: loading },
                )}
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <div className=" ">
          <LoadingComponent />
        </div>
      ) : (
        <section id="signup-form" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Create Your Vendor Account
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter a password"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/vendors/signin" className="text-primary">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
