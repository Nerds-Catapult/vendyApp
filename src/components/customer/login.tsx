import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import LocalStorageService from "../../logic/localStorageAuth.ts";


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

const Login = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if (localStorageService.readAuthToken('customerToken')) {
            window.location.href = '/profile';
        }
    }, [localStorageService]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!!email ||   !password ) {
          alert("Please fill all the fields");
          return;
        }
        try {
          const response = await fetch(
            "http://localhost:4200/api/login-customer",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
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
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-white login rounded-xl shadow-xl w-[400px] h-fit mx-auto p-5">
                <h1 className="text-center capitalize">Welcome Back</h1>
                <form className="bg-gray-100 p-10">
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
                        onClick={handleSubmit}
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
