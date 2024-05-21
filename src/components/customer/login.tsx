import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import LocalStorageService from "../../logic/localStorageAuth.ts";




interface FormData {
  email: string;
  password: string;
}


const Login = () => {
  const localStorage = LocalStorageService.getInstance();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.readAuthToken("customerToken")) {
      window.location.href = "/";
    }
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  interface expectedCustomer {
    status: number;
    message: string;
    entity: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
    }
    token: string;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4200/api/login-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data: expectedCustomer = await response.json();
      if (data.status === 201) {
        toast.success(data.message);
        localStorage.writeAuthToken("customerToken", data.token);
        localStorage.writeCustomerProfileData("customer", JSON.stringify(data.entity));
        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


    return (
      <>
      <div className="flex bg-gradient-to-r from-pink-500 to-slate-900 text-white justify-center py-28 h-screen">
        <div className="w-96 bg-white/30 p-4 rounded-lg backdrop-blur-sm	h-3/4">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form className="py-[30%] text-black" onSubmit={handleSubmit}>
            <div className="mb-4 text-black">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 p-2 rounded-lg mt-4 text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
    );
};

export default Login;
