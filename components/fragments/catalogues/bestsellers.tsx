"use client"

import { useState, useEffect } from "react";
import { expectedBusinessInterface, expectedBusiness } from '@/app/types/index'
import Image from "next/image";

const BestSellers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [businesses, setBusinesses] = useState<expectedBusiness[]>([]);

  useEffect(() => {
    const BestSellers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4200/api/businesses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: expectedBusinessInterface = await response.json();
        if (data.entity) {
          setBusinesses(data.entity as unknown as expectedBusiness[]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    BestSellers().then((r) => r);
  }, []);

  const Sellers = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {business.businessName}
                  </h3>
                  <p className="text-gray-500">E-commerce</p>
                </div>
                <Image
                  src={business.imageUrl || "https://via.placeholder.com/150"}
                  alt={business.businessName}
                  className="w-16 h-16 rounded-full object-cover ml-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{business.address}</p>
                  <p className="text-gray-600">{business.county}</p>
                </div>
                <a
                  href={`/business/${business.id}`}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loading />
          </div>
        ) : (
          <Sellers />
        )}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BestSellers;
