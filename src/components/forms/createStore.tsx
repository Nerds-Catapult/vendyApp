import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import LocalStorageService from "../../logic/localStorageAuth.ts";
import Spinner from "../spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../nav/Nav.tsx";

interface expectedProps {
  secure_url: string;
  url: string;
}

interface expectedState {
  state: {
    isAuthenticated: boolean;
    status: number;
    message: string;
    email: string;
    token: string | null;
  };
}

interface expectedCustomer {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  imageUrl: string | null;
}

const CreateStore: React.FC = () => {
  const localStorageService = LocalStorageService.getInstance();
  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [subCounty, setSubCounty] = useState("");
  const [ward, setWard] = useState("");
  const [area, setArea] = useState("");
  const [customerId, setCustomerId] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState(null);
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const authStateProtocol = async () => {
      const token = localStorageService.readAuthToken("customerToken");
      if (!token) {
        toast.error("You need to login first, redirecting to login page...");
        setTimeout(() => {
          window.location.href = "/login-customer";
        }, 3000);
      }
      const customer = await fetch(
        "https://vendy-server.onrender.com/api/get-customer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: expectedCustomer = await customer.json();
      if (data) {
        localStorageService.writeCustomerProfileData(
          "customer",
          JSON.stringify(data)
        );
        setCustomerId(data.id);
      }
      toast.error("something went wrong, redirecting to login page...");
      //redirect to login page
    };
    authStateProtocol();
  }, [localStorageService]);

  const handleUpload = async (): Promise<string> => {
    setLoading(true);
    const data = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    data.append("file", file);
    const response = await fetch(
      "https://vendy-server.onrender.com/api/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return response.json();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "businessName") {
      setBusinessName(value);
    } else if (name === "address") {
      setBusinessAddress(value);
    } else if (name === "phoneNumber") {
      setBusinessPhoneNumber(value);
    } else if (name === "email") {
      setBusinessEmail(value);
    } else if (name === "county") {
        setCategory(value);
    } else if (name === "sub-county") {
        setSubCounty(value);
    } else if (name === "ward") {
        setWard(value);
    } else if (name === "area") {
        setArea(value);
    } else if (name === "firstName") {
        setFirstName(value);
    } else if (name === "lastName") {
        setLastName(value);
    } else if (name === "identificationNumber") {
        setIdentificationNumber(value);
    } else if (name === "password") {
        setPassword(value);
    }
  };

  async function registerBusiness(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = (await handleUpload()) as unknown as expectedProps;
      const data = await fetch(
        "https://vendy-server.onrender.com/api/create-business",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({
                businessName: businessName,
                address: businessAddress,
                phoneNumber: businessPhoneNumber,
                email: businessEmail,
                subCounty: subCounty,
                ward: ward,
                area: area,
                category: category,
                imageUrl: response.secure_url,
                customerId: customerId,
                firstName: firstName,
                lastName: lastName,
                identificationNumber: identificationNumber,
                password: password,
                phone: businessPhoneNumber
                
          }),
        }
      );
      const res: expectedState = await data.json();
      if (res.state.status == 201) {
        toast.success(res.state.message);
        localStorageService.writeBusinessEmail(
          "businessEmail",
          res.state.email
        );
        window.location.href = "/business-dashboard";
      } else {
        toast.error(res.state.message);
        setLoading(false);
      }

      setLoading(false);
    } catch (e) {
      console.log({ error: e });
      setLoading(false);
      toast.error("Business registration failed, Please try again");
    }
  }

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
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setIdentificationNumber(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
            <a href="/login-business" className="text-blue-500">
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
