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
        <div className="flex h-screen justify-center items-center">
            <div className="bg-white login rounded-xl shadow-xl w-[400px] h-fit mx-auto p-5">
                <h1 className="text-center capitalize">Welcome Back</h1>
                <form className="bg-gray-100 p-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block font-bold">
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
                        <label htmlFor="password" className="block font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-5">
                    Don't have an account?{" "}
                    <a href="signup" className="text-blue-500">
                        Signup
                    </a>
                </p>
                <ToastContainer/>
            </div>
        </div>
    );
};

export default Login;
