import React, { useState, } from "react";

import Navbar from "../../nav/Nav";
import Spinner from "../../spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import LocalStorageService from "../../../logic/localStorageAuth";


interface expectedProps {
    email: string | null,
    isAuthenticated: false,
    message: string,
    status: number,
    token: string | null;
}

const LoginAdmin = () => {
    const localStorage = LocalStorageService.getInstance()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const response = await fetch("https://vendy-server.onrender.com/api/login-business-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data: expectedProps = await response.json()
        if (data.status === 200) {
            toast.success(data.message)
            // localStorage.setItem("businessAdmin", data.token!)
            localStorage.writeBusinessAdminToken("businessAdmin", data.token!)
            localStorage.writeAdminEmail("adminEmail", email)
            window.location.href = "/create-store"
        } else {
            toast.error(data.message)
        }
        setLoading(false)
    }
  return (
    <div className=" h-screen">
      <Navbar />
          {
              loading ? <div className=" justify-center text-blue flex items-center h-screen"><Spinner/></div> : <div className="flex justify-center h-[80vh]">
              <div className="flex flex-col w-1/3">
                  <h1 className="text-4xl text-center">Login as Admin</h1>
                  <form className="flex flex-col gap-4 mt-[30%] border-2 p-6" onSubmit={handleLogin}>
                      <div>
                          <label htmlFor="email" className="block font-medium text-gray-700 mb-1">Email</label>
                          <input type="email" name="email" id="email" required className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block font-medium text-gray-700 mb-1">Password</label>
                          <input type="password" name="password" id="password" required className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}/>
                      </div>
                      <div className="flex justify-between items-center">
                          <div>
                              <input type="checkbox" id="remember" name="remember" className="mr-2"/>
                              <label htmlFor="remember" className="text-gray-700">Remember me</label>
                          </div>
                          <a href="/forgot-password" className="text-blue-700">Forgot Password?</a>
                      </div>
                      <div className="flex justify-end">
                          <button type="submit" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
                      </div>
                      <div className="mt-7 flex w-full justify-center">
                          <span className="text-center text-black">
                              Don't have an account?
                              <a href="/create-admin" className="text-blue-700">Register</a>
                          </span>
                      </div>
                  </form>
              </div>
    </div>
          }
          <ToastContainer/>
    </div>
  );
};

export default LoginAdmin;
