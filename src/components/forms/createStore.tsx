import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../nav/Nav.tsx";
import Cookies from "js-cookie";

const CreateStore: React.FC = () => {
  interface ExpectedProps {
    secure_url: string;
    url: string;
  }

  interface ExpectedState {
    state: {
      isAuthenticated: boolean;
      status: number;
      message: string;
      email: string;
      token: string | null;
    };
  }

  interface ExpectedCustomer {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    imageUrl: string | null;
  }

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    businessEmail: "",
    businessPhoneNumber: "",
    businessAddress: "",
    subCounty: "",
    ward: "",
    area: "",
    customerId: 0,
    firstName: "",
    lastName: "",
    identificationNumber: "",
    password: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const authStateProtocol = async () => {
          const customerToken = Cookies.get("customerToken");
      if (!customerToken) {
        toast.error("You need  first, redirecting to login page...");
        setTimeout(() => {
          window.location.href = "/auth/customer/signup";
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
        localStorage.setItem(
          "customer",
          JSON.stringify(data)
        );
        setFormData((prevData) => ({
          ...prevData,
          customerId: data.id,
        }));
      } catch (error) {
        console.error("Error fetching customer data:", error);
        toast.error("Something went wrong, redirecting to login page...");
        setTimeout(() => {
          window.location.href = "/auth/customer/signup";
        }, 3000);
      }
    };
    authStateProtocol();
  }, []);

  const handleUpload = async (): Promise<string> => {
    setLoading(true);
    const data = new FormData();
    if (file) {
      data.append("file", file);
    }
    const response = await fetch("http://localhost:4200/api/upload", {
      method: "POST",
      body: data,
    });
    return response.json();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = (await handleUpload()) as unknown as ExpectedProps;
      const data = await fetch("http://localhost:4200/api/create-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: response.secure_url,
          phone: formData.businessPhoneNumber,
        }),
      });
      const res: ExpectedState = await data.json();
      if (res.state.status === 201) {
        toast.success(res.state.message);
        window.location.href = "/business-dashboard";
      } else {
        toast.error(res.state.message);
      }
    } catch (error) {
      console.error("Error registering business:", error);
      toast.error("Business registration failed, please try again");
    } finally {
      setLoading(false);
    }
  };
  const createBusiness = () => {
    return (
      <div className="flex justify-center items-center h-full bg-gray-100 py-9">
        <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl md:max-w-4xl">
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
                required
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
                required
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
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-1"
              >
                Business Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
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
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="sub-county"
                className="block font-medium text-gray-700 mb-1"
              >
                Sub County
              </label>
              <input
                type="text"
                name="sub-county"
                id="sub-county"
                required
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
                required
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
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
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
                required
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
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="image"
                className="block font-medium text-gray-700 mb-1"
              >
                Business Logo
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpg, image/jpeg"
                  required
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
              onClick={registerBusiness}
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
        <ToastContainer />
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        createBusiness()
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateStore;
