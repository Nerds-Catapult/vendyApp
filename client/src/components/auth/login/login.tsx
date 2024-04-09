import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import axios from "axios";

const Login = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!email || !password) {
            console.log('Please fill all the fields');
            return;
        }
        const data = {
            email,
            password,
        }
        const response = await axios.post('http://localhost:4200/api/customer-login', data);
        console.log(response.data)
    }
    useEffect(() => {
        const token = localStorageService.readAuthToken("token");
        console.log(token);
        // if (token) {
        //     window.location.href = "/auth/profile";
        // }
    }, [localStorageService]);
    return (
        <div className="bg-white login rounded-xl shadow-xl w-[400px] h-2/5 mx-auto p-5">
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
        </div>
    );
};

export default Login;
