import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import Spinner from '../../spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';

const BusinessAdmin: React.FC = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    //registration values
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const handleRegistrationHTMLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'phone') {
            setPhone(value);
        } else if (name === 'password') {
            setPassword(value);
        } else {
            setPassword2(value);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (name === 'image') {
            setImage(files![0]);
            console.log(files![0])
        }

    }
    const clearStates = () => {
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setPassword2("")
        setImage(null)
    }

    useEffect(() => {
        const checkTokenExists = () => {
            setLoading(true)
            const businessToken = localStorageService.readBusinessToken('BusinessToken')
            if (businessToken) {
                window.location.href = '/business-dashboard';
            }
            setLoading(false)
        }
        checkTokenExists()
        /**
         * TODO: check if token is valid or expired
         */
    }, [localStorageService]);

    useEffect(() => {
        if (password.length == 0) {
            setPasswordError("");
        } else if (password !== password2) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("password match");
        }
    }, [password, password2]);


    const createAdmin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        setLoading(true)
            if (!name || !email || !phone || !password || !password2) {
                toast.error("Please fill all the fields")
                setLoading(false)
            }
            const response = await fetch('http://localhost:4200/api/create-business-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, phone, password, image})
            })
            if (response.ok) {
                const data = await response.json()
                localStorageService.writeBusinessAdminToken("BusinessToken", data.token)
                toast.success("Admin created successfully")
                setLoading(false)
                window.location.href = '/business-dashboard'
            } else if (response.status === 400) {
                toast.error("Admin with the same email exists, please specify a different one")
                setLoading(false)
            }
            clearStates();
        } catch (error) {
            console.log(error)
            toast.error("failed to create entity, please try again later")
            setLoading(false)
        }
    }


    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }
    const loginAdmin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!email || !password) {
                toast.error("please input all fields")
            }
            const response = await fetch('http://localhost:4200/api/login-business-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })
            const data = await response.json()
            localStorageService.writeBusinessAdminToken("BusinessToken", data.token)
            console.log(data)
        } catch (error) {
            setLoading(false)
            toast.error("failed to login, please try again later")
        }
    }

    const CreateBusinessAdmin = () => {
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
                                name="name"
                                id="name"
                                required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleRegistrationHTMLChange}
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
                                onChange={handleRegistrationHTMLChange}
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
                                onChange={handleRegistrationHTMLChange}
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
                                onChange={handleRegistrationHTMLChange}
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
                                onChange={handleRegistrationHTMLChange}
                            />
                            <div>
                            <span className={
                                passwordError === "Passwords do not match" ? "text-red-500" : "text-green-500"}>{passwordError}</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                formEncType={"multipart/form-data"}
                                required
                                onChange={handleImageChange}
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

    const LoginBusinessAdmin = () => {
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
                                onChange={handleLoginChange}
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
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={loginAdmin}
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-7 flex w-full justify-center">
                    <span className="text-center text-purple-700">
                        Already Have an account?
                        <button className="text-blue-500" onClick={() => setShowLogin(false)}>Login </button></span>
                    </div>
                </form>
            </div>
        )

    }

    return (
        <div>
            {
                loading ? <div className="flex justify-center items-center h-screen"><Spinner/>
                </div> : showLogin ? LoginBusinessAdmin() : CreateBusinessAdmin()
            }
            <ToastContainer/>
        </div>
    );
};

export default BusinessAdmin;