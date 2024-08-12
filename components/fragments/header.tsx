"use client";

import Link from "next/link";
import { JSX, SVGProps, useState, useEffect } from "react";
import Image from "next/image";
import { Store } from "@/app/types/foreignTypes";
import Loading from "../ui/loading";

export default function Component() {
  type ReturnedStorePropsFromserver = Store[];
  const [stores, setStores] = useState<ReturnedStorePropsFromserver>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchStores = async (): Promise<ReturnedStorePropsFromserver> => {
    return new Promise((resolve, reject) => {
      fetch("https://vendy-server.onrender.com/api/stores", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    fetchStores()
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Popular Stores
          </h1>
          <p className="mt-4 max-w-3xl text-center text-muted-foreground md:text-xl"></p>
        </div>
        <div className="relative mt-10 flex items-center">
          <button
            className="absolute left-0 z-10 rounded-full bg-background p-2 shadow-md transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled
          >
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </button>
          <div className="mx-auto flex w-full max-w-5xl flex-nowrap overflow-x-auto scrollbar-hide">
            <div className="flex gap-6">
              {loading ? (
                <Loading />
              ) : (
                stores
                  .filter((store) => store.storeLogo)
                  .filter((store, index) => index < 10)
                  .map((store, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Link
                        href={`/store/${store.id}`}
                        className="group"
                        prefetch={false}
                      >
                        <div className="relative h-32 w-32 overflow-hidden rounded-full">
                          <Image
                            src={store.storeLogo}
                            alt={store.storeName}
                            width={128}
                            height={128}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="mt-2 text-center font-medium">
                          {store.storeName}
                        </div>
                      </Link>
                    </div>
                  ))
              )}
            </div>
          </div>
          <button className="absolute right-0 z-10 rounded-full bg-background p-2 shadow-md transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <ChevronRightIcon className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
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
      <path d="m9 18 6-6-6-6" />
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
