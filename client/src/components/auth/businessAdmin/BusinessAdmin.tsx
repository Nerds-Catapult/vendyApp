import React, {useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import Spinner from '../../spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';

const BusinessAdmin: React.FC = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const token = localStorageService.readAuthToken('token');
        /**
         * TODO: check if token is valid or expired
         */
        if (!token) {
            window.location.href = '/auth/login';
        }
    }, [localStorageService]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        console.log(name, value);
    }

    const createAdmin = () => {
    }


    const createBusinessAdmin = () => {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Create An Admin Account</h1>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                                Admin Name
                            </label>
                            <input
                                type="text"
                                name="businessName"
                                id="name"
                                required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                                Email
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
                            <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                                password
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
                        <div>
                            <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={createAdmin}
                        >
                            Create Your Admin Account
                        </button>
                    </div>
                    <div className="mt-7 flex w-full justify-center">
                    <span className="text-center text-purple-700">
                        Already Have an account?
                        <button className="text-blue-500" onClick={() => setShowLogin(true)}>Login </button></span>
                    </div>
                </form>
            </div>
        )
    }

    const loginBusinessAdmin = () => {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Login To Your Admin Account</h1>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                                Email
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
                            <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                                password
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
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={createAdmin}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        )

    }

    return (
        <div>
            {
                loading ? <Spinner/> : showLogin ? loginBusinessAdmin() : createBusinessAdmin()
            }
            <ToastContainer/>
        </div>
    );
};

export default BusinessAdmin;