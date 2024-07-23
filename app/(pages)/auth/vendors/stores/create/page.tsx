"use client";


//TODO: all these auth functions can be state managed by the context api or redux
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import LoadingComponent from "@/components/ui/loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  ValidationAuthProps,
  checkIfVendorHasStoreReturnsBoolean,
  ExpectedAStoreCategory,
  ExpectedAsCloudinaryResponse,
  ExpectedAsStoreProps,
} from "@/app/types/foreignTypes";

export default function CreateStoreComponent() {
  const counties = [
    "Baringo",
    "Bomet",
    "Bungoma",
    "Busia",
    "Elgeyo-Marakwet",
    "Embu",
    "Garissa",
    "Homa Bay",
    "Isiolo",
    "Kajiado",
    "Kakamega",
    "Kericho",
    "Kiambu",
    "Kilifi",
    "Kirinyaga",
    "Kisii",
    "Kisumu",
    "Kitui",
    "Kwale",
    "Laikipia",
    "Lamu",
    "Machakos",
    "Makueni",
    "Mandera",
    "Marsabit",
    "Meru",
    "Migori",
    "Mombasa",
    "Murang'a",
    "Nairobi",
    "Nakuru",
    "Nandi",
    "Narok",
    "Nyamira",
    "Nyandarua",
    "Nyeri",
    "Samburu",
    "Siaya",
    "Taita-Taveta",
    "Tana River",
    "Tharaka-Nithi",
    "Trans Nzoia",
    "Turkana",
    "Uasin Gishu",
    "Vihiga",
    "Wajir",
    "West Pokot",
  ];
  const categories = [
    "Clothing",
    "Electronics",
    "Home Decor",
    "Beauty",
    "Sports",
    "Toys",
    "Other",
  ];

  const [loading, setLoading] = useState(false);
  const [storeCategories, setStoreCategories] = useState<
    ExpectedAStoreCategory[]
  >([]);
  const [authToken, setAuthTokem] = useState(Cookies.get("storeToken"));
  const [fileData, setFileData] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    storeName: "",
    storeLocation: "",
    storeAddress: "",
    county: "",
    ward: "",
    storeArea: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    categoryName: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFileData(files[0]);
    }
  };
  const handeCategoryChange = (val: string) => {
    setFormData({
      ...formData,
      categoryName: val,
    });
  };

  const handleCountyChange = (val: string) => {
    setFormData({
      ...formData,
      county: val,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const ValidateAuthToken = async (): Promise<ValidationAuthProps> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://3127-102-217-66-27.ngrok-free.app/api/auth/validate",
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
            "https://3127-102-217-66-27.ngrok-free.app/api/auth/hasStore",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          const data: checkIfVendorHasStoreReturnsBoolean =
            await response.json();
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
    setLoading(true);
    if (authToken) {
      ValidateAuthToken()
        .then((data) => {
          if (data.statusCode === 200) {
            checkIfVendorHasStore()
              .then((data) => {
                if (data.hasStore) {
                  window.location.href = "/vendors/dashboard";
                }
              })
              .catch((error) => {
                toast.error(error);
                setLoading(false);
              });
          } else {
            window.location.href = "/auth/vendors/login";
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred while validating the token");
          setLoading(false);
        });
    } else {
      Cookies.remove("storeToken");
      window.location.href = "/auth/vendors/login";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, authToken]);

  const fetchStoreCategories = async () => {
    try {
      const response = await fetch(
        "https://3127-102-217-66-27.ngrok-free.app/api/store-category",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: ExpectedAStoreCategory[] = await response.json();
      if (data) {
        setStoreCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStoreCategories();
  }, [formData]);

  const uploadImageToCloudinary = async (
    file: File
  ): Promise<ExpectedAsCloudinaryResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://3127-102-217-66-27.ngrok-free.app/api/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data: ExpectedAsCloudinaryResponse = await response.json();
        if (data) {
          resolve(data);
        } else {
          reject("An error occurred while uploading the image");
        }
      } catch (error) {
        reject("An error occurred while uploading the image");
      }
    });
  };

  const uploadStoreLogo = async (): Promise<ExpectedAsCloudinaryResponse> => {
    return new Promise(async (resolve, reject) => {
      if (fileData) {
        uploadImageToCloudinary(fileData)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Please select an image to upload");
      }
    });
  };

  const invokeImageDelete = async (
    publicId: string
  ): Promise<ExpectedAsCloudinaryResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "https://3127-102-217-66-27.ngrok-free.app/api/image/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publicId }),
          }
        );
        const data: ExpectedAsCloudinaryResponse = await response.json();
        if (data) {
          resolve(data);
        } else {
          reject("An error occurred while deleting the image");
        }
      } catch (error) {
        reject("An error occurred while deleting the image");
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { secure_url, public_id } = await uploadStoreLogo();
    if (!secure_url || secure_url === "" || secure_url === null) {
      toast.error("An error occurred while uploading the image");
    } else {
      const storeData = {
        ...formData,
        storeLogo: secure_url,
      };
      try {
        const response = await fetch(
          "https://3127-102-217-66-27.ngrok-free.app/api/stores",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(storeData),
          }
        );
        const data: ExpectedAsStoreProps = await response.json();
        if (data.httpStatus === 201) {
          toast.success(data.message);
          setTimeout(() => {
            window.location.href = "/vendors/dashboard";
          }, 2000);
        } else {
          toast.error(data.message);
          invokeImageDelete(public_id);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while creating the store");
        invokeImageDelete(public_id);
        setLoading(false);
      }
    }
  };

  const RegisterStore = async () => {};
  return (
    <main className="flex justify-center  items-center h-[100vh]">
      <Card className="w-full max-w-3xl items-center bg-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Store</CardTitle>
          <CardDescription>
            Fill out the form below to register your ecommerce store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? ( //TODO: Add a loading spinner
            <p>Loading...</p>
          ) : (
            <form className="grid gap-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                      id="storeName"
                      name="storeName"
                    placeholder="Enter store name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryName">Store Category</Label>
                  <Select onValueChange={handeCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select store category" />
                    </SelectTrigger>
                    <SelectContent>
                      {storeCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeLocation">Store Location</Label>
                    <Input
                      name="storeLocation"
                    id="storeLocation"
                    placeholder="Enter store location"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Owner Full Names</Label>
                    <Input
                      name="ownerName"
                    id="ownerName"
                    placeholder="Enter owner name"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="owneremail">Owner Email</Label>
                    <Input
                      name="ownerEmail"
                    id="ownerEmail"
                    type="email"
                    placeholder="Enter Your Vendor email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Owner Phone</Label>
                    <Input
                      name="ownerPhone"
                    id="ownerPhone"
                    type="tel"
                    placeholder="Enter Vendor phone"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                    <Input
                      name="storeAddress"
                    id="storeAddress"
                    type="text"
                    placeholder="Enter store address"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">County</Label>
                  <Select onValueChange={handleCountyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ward">Store ward</Label>
                    <Input
                      name="ward"
                    id="ward"
                    type="text"
                    placeholder="Enter store ward"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeArea">Store Area</Label>
                    <Input
                      name="storeArea"
                    id="storeArea"
                    type="text"
                    placeholder="Enter store Area"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Store Logo</Label>
                  <Input id="logo" type="file" onChange={handleFileChange} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="terms-conditions" />
                <Label htmlFor="terms-conditions">
                  I agree to the{" "}
                  <Link href="#" className="underline" prefetch={false}>
                    Terms and Conditions
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="ml-auto">
                Register Store
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
