import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import { toast, ToastContainer } from "react-toastify";

interface expectedCustomer {
  isAuthenticated: boolean;
  status: number;
  message: string;
  customer: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    token: string;
  };
}


const Signup = () => {
  const localStorageService = LocalStorageService.getInstance();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("customer");
  const [password2, setPassword2] = useState("customer");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setPassword2(value);
    }
  };

  useEffect(() => {
    if (localStorageService.readAuthToken("customerToken")) {
      window.location.href = "/profile";
    }
  }, [localStorageService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || !phone || !password || !password2) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:4200/api/create-customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: name,
            lastName: name,
            email,
            password,
            address,
            phone,
          }),
        }
      );
      const data = await response.json();
      if (data.status !== 201) {
        toast.error(data.message);
      } else {
        const parseCustomerInfo: expectedCustomer = data;
        toast.success(parseCustomerInfo.message);
        localStorageService.writeAuthToken(
          "customerToken",
          parseCustomerInfo.customer.token
        );
        localStorageService.writeCustomerProfileData(
          "customerProfile",
          JSON.stringify(parseCustomerInfo.customer)
        );
        window.location.href = "/profile";
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  useEffect(() => {
    if (password.length == 0) {
      setPasswordError("");
    } else if (password !== password2) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("password match");
    }
  }, [password, password2]);

  return (
    <>
      <div className="bg-white login rounded-xl shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-fit mx-auto p-5">
        <h1 className="text-center capitalize text-2xl font-bold mb-5">
          Create An Account
        </h1>
        <form className="bg-gray-100 p-6 sm:p-8 md:p-10">
          <div className="mb-5">
            <label htmlFor="name" className="block font-bold mb-1">
              Full Names
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="block font-bold mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block font-bold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password2" className="block font-bold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
                value={password2}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <span
              className={
                passwordError === "Passwords do not match"
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {passwordError}
            </span>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>
        <p className="text-center mt-5">
          Have an account?{" "}
          <a href="login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
