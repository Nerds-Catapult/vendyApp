import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from "../../../hooks/useAuth.ts";
import localStorageAuth from "../../../logic/localStorageAuth.ts";
import {toast, ToastContainer} from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();

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
        if (!email || !password) {
            toast.error('Please fill all the fields');
            return;
        }
        try {
            await login(email, password);
            toast.success('successfully logged in');
            window.location.href = '/profile';
        } catch (error) {
            toast.error('Invalid email or password');
        }
    };
    const localStorageService = localStorageAuth.getInstance();
    useEffect(() => {
        if (localStorageService.readAuthToken('token')) {
            console.log(localStorageService.readAuthToken('token'));
            window.location.href = '/profile';
        }
    }, [localStorageService])

    return (
        <>
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
        </>
    );
};

export default Login;
