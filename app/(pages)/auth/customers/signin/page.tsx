"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FormEvent, useState, useEffect } from "react";
import Cookies from "js-cookie";


import type { ValidationAuthProps, loginHttpResponse } from "@/app/types/foreignTypes";
import {toast} from "react-hot-toast";

export default function Component() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [authToken, setAthToken] = useState(Cookies.get("customerToken"));

  const ValidateAuthToken = async (): Promise<ValidationAuthProps> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "http://localhost:4200/api/auth/validate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data: ValidationAuthProps = await response.json();
        console.log(data);
        if (data.statusCode === 200) {
          resolve(data);
        } else if (data.statusCode === 401) {
          Cookies.remove("customerToken");
        }
      } catch (error) {
        reject("An error occurred while validating the token");
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (authToken) {
      ValidateAuthToken().then((data) => {
        if (data.statusCode === 200) {
          window.location.href = "/auth/customers/profile";
        } else {
          Cookies.remove("customerToken");
        }
        return;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await fetch("http://localhost:4200/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data: loginHttpResponse = await response.json();
      if (data.httpStatus === 200) {
        Cookies.set("customerToken", data.accessToken);
        window.location.href = "/auth/customers/profile";
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              href="/auth/customers/signup"
              className="font-medium text-primary hover:text-primary/90"
              prefetch={true}
            >
              sign up for a new account
            </Link>
          </p>
        </div>
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                // value = {formData.email}
                onChange={handleChange}
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
              />
              <span className="text-sm text-red-600">
                {" "}
              </span>
            </div>
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm focus-visible:ring-primary focus-visible:ring-1 focus-visible:ring-offset-0"
              />
              <span className="text-sm text-red-600">
                {" "}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                className="h-4 w-4 rounded text-primary focus:ring-primary"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-muted-foreground"
              >
                Remember me
              </Label>
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
              className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
