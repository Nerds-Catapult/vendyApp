"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  VendorTypeFromServer,
  ValidationAuthProps,
  checkIfVendorHasStoreReturnsBoolean,
} from "@/app/types/foreignTypes";
  

//login component
export default function Component() {



  function LoadingComponent() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <svg
          className="h-12 w-12 animate-spin text-primary"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(Cookies.get("storeToken"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    for (let key in formData) {
      if (key === e.target.id) {
        setFormData({ ...formData, [key]: e.target.value });
      } 
    }
  };

const ValidateAuthToken = async (): Promise<ValidationAuthProps> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://d87e-2c0f-2f00-100-be00-5855-9723-e1d-10dd.ngrok-free.app/api/auth/validate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data: ValidationAuthProps = await response.json();
      if (data) {
        resolve(data);
      } else {
        reject("An error occurred while validating the token");
      }
    } catch (error) {
      reject("An error occurred while validating the token");
      console.log(error);
    }
  });
};

const checkIfVendorHasStore =
  async (): Promise<checkIfVendorHasStoreReturnsBoolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://d87e-2c0f-2f00-100-be00-5855-9723-e1d-10dd.ngrok-free.app/api/auth/hasStore",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data: checkIfVendorHasStoreReturnsBoolean = await response.json();
        if (data) {
          resolve(data);
        } else {
          reject("An error occurred while checking if vendor has store");
        }
      } catch (error) {
        reject("An error occurred while checking if vendor has store");
      }
    });
  };

useEffect(() => {
  if (authToken) {
    ValidateAuthToken()
      .then((data) => {
        if (data.statusCode === 200) {
          checkIfVendorHasStore()
            .then((data) => {
              if (data.hasStore) {
                console.log("Vendor has store");
                window.location.href = "/vendors/dashboard";
              } else {
                window.location.href = "/auth/vendors/stores/create";
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("Token is invalid");
          Cookies.remove("storeToken");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [, authToken]);

//TODO:double check this logic
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const { email, password } = formData;
    if (!email || !password) {
      return;
    }
    setLoading(true);
    const response = await fetch(
      "https://d87e-2c0f-2f00-100-be00-5855-9723-e1d-10dd.ngrok-free.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data: VendorTypeFromServer = await response.json();
    if (data) {
      toast.success("Vendor created successfully");
      Cookies.set("storeToken", data.token);
      //refresh the page
      window.location.href = "/auth/vendors/stores/create";
    } else {
      toast.error(
        "An error occurred while fetching your vendor profile, try again"
      );
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    toast.error(
      "An error occurred while fetching your vendor profile, try again"
    );
    console.log(error);
  }
};
  return (
    <>
      l
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Access your vendor marketplace account
              </p>
              <Link
                href="/auth/vendors/signup"
                className="block mt-4 text-center text-primary hover:text-primary/90"
                prefetch={false}
              >
                Create an account
              </Link>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  placeholder="Email address"
                  className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-medium text-primary hover:text-primary/90"
                    prefetch={false}
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
