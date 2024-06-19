import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import Spinner from "../spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../nav/Nav.tsx";
import Cookies from "js-cookie";
import {expectedBusinessInterface, ExpectedCustomer, asCloudinaryResponse} from "@/types/index.ts";

const CreateStore: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        ownerFirstName: "",
        ownerLastName: "",
        identificationNumber: "",
        password: "",
        phoneNumber: "",
        businessName: "",
        businessCategory: "",
        businessEmail: "",
        address: "",
        county: "",
        subCounty: "",
        ward: "",
        area: "",
        imageUrl: ""
    });
    const [fileImage, setFileImage] = useState<File | null>(null);

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileImage(file);
        }
    };

    const handleUploadImage = async () => {
        if (!fileImage) {
            toast("Please select an image");
            return;
        }
        const formData = new FormData();
        formData.append("file", fileImage);
        const response = await fetch("http://localhost:4200/api/upload", {
          method: "POST",
          body: formData,
        });
        return await response.json();
    };


    useEffect(() => {
      const authStateProtocol = async () => {
        const customerToken = Cookies.get("customerToken");
        if (!customerToken) {
          toast.error("You need to log in first, redirecting to login page...");
          setTimeout(() => {
            window.location.href = "/auth/customer/signup";
          }, 3000);
          return;
        }
        const businessToken = Cookies.get("businessToken");
        if (businessToken) {
          toast(
            "You are already logged in as a business, redirecting to dashboard..."
          );
          setTimeout(() => {
            window.location.href = "/admin/dashboard";
          }, 3000);
          return;
        }

        try {
          const response = await fetch(
            "http://localhost:4200/api/get-customer",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${customerToken}`,
              },
            }
          );
          const data: ExpectedCustomer = await response.json();
          if (data.status !== 200) {
            toast.error(
              "You need to log in first, redirecting to login page..."
            );
            setTimeout(() => {
              window.location.href = "/auth/customer/signup";
            }, 3000);
            return;
          }
          localStorage.setItem("customer", JSON.stringify(data));
        } catch (error) {
          toast.error("Something went wrong, redirecting to login page...");
          setTimeout(() => {
            window.location.href = "/auth/customer/signup";
          }, 3000);
        }
      };

      authStateProtocol().then((r) => r);
    }, []);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const registerBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const { secure_url, url }: asCloudinaryResponse =
          await handleUploadImage();
        const response = await fetch(
          "http://localhost:4200/api/create-business",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              ...formData,
              imageUrl: secure_url || url,
            }),
          }
        );
        const data: expectedBusinessInterface = await response.json();
        if (data.status === 201) {
          toast.success(data.message);
          setTimeout(() => {
            // window.location.href = "/store";
          }, 3000);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error registering business:", error);
        toast.error("Something went wrong, please try again later.");
      } finally {
        setLoading(false);
      }
    };
    const createBusiness = () => {
        return (
            <div className="flex justify-center items-center h-full bg-gray-100 py-9">
                <form
                    className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl md:max-w-4xl"
                    onSubmit={registerBusiness}
                >
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Register Your Business
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="businessName"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Business Name
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                id="businessName"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Business Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="businessCategory"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Business Category
                            </label>
                            <input
                                type="text"
                                name="businessCategory"
                                id="businessCategory"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Business Phone
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.phoneNumber}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="businessEmail"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Business Email
                            </label>
                            <input
                                type="email"
                                name="businessEmail"
                                id="businessEmail"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="county"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                County
                            </label>
                            <input
                                type="text"
                                name="county"
                                id="county"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.county}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subCo  unty"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Sub County
                            </label>
                            <input
                                type="text"
                                name="subCounty"
                                id="subCounty"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="ward"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Ward
                            </label>
                            <input
                                type="text"
                                name="ward"
                                id="ward"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="area"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Area
                            </label>
                            <input
                                type="text"
                                name="area"
                                id="area"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="ownerFirstName"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                name="ownerFirstName"
                                id="ownerFirstName"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="ownerLastName"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="ownerLastName"
                                id="ownerLastName"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="identificationNumber"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Identification Number
                            </label>
                            <input
                                type="text"
                                name="identificationNumber"
                                id="identificationNumber"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                // required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="imageUrl"
                                className="block font-medium text-gray-700 mb-1"
                            >
                                Business Logo
                                <input
                                    type="file"
                                    name="imageUrl"
                                    id="imageUrl"
                                    accept="image/png, image/jpg, image/jpeg"
                                    // required
                                    onChange={handleSelectFile}
                                    className="mt-1"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register Business
                        </button>
                    </div>
                    <span className="ml-2 text-gray-500">
            Already have an account?{" "}
                        <a href="/login-store" className="text-blue-500">
              Login
            </a>
          </span>
                </form>
            </div>
        );
    };

    return (
        <div>
            <Navbar/>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner/>
                </div>
            ) : (
                createBusiness()
            )}
            <ToastContainer/>
        </div>
    );
};

export default CreateStore;