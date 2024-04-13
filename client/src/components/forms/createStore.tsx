import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {useAuth} from "../../hooks/useAuth.ts";
import LocalStorageService from "../../logic/localStorageAuth.ts";
import Spinner from '../spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../nav/Nav.tsx";


const CreateStore: React.FC = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [loading, setLoading] = useState(false);
    const [showCreateStore, setShowCreateStore] = useState(false);
    const {CreateBusiness} = useAuth();

    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    // eslint-disable-next-line no-debugger
    // debugger
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'businessName') {
            setBusinessName(value);
        } else if (name === 'address') {
            setAddress(value);
        } else if (name === 'phoneNumber') {
            setphoneNumber(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'country') {
            setCountry(value);
        } else {
            setCity(value);
        }
    }
    //check Authentication
    useEffect(() => {
        const token = localStorageService.readAuthToken('token');
        /**
         * TODO: check if token is valid or expired
         */
        if (!token) {
            window.location.href = '/auth/login';
        }
    }, [localStorageService]);


    //when business is created then show the create store form
    useEffect(() => {
        //check error and success
        const businessToken = localStorageService.readBusinessToken('businessToken');
        if (businessToken) {
            setShowCreateStore(true);
        }
    }, [localStorageService]);

    async function registerBusiness(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            if (!businessName || !address || !phoneNumber || !email || !country || !city) {
                toast.error('Please fill in all fields');
                setLoading(false);
                return;
            }
            const response = await CreateBusiness({
                businessName,
                phoneNumber,
                email,
                address,
                city,
                country
            });
            setLoading(false);
            console.log(response.data)
        } catch (err) {
            toast.error('Error occurred while registering business');
            setLoading(false);
        }
    }

    const createStore = () => {
        return (
            <div>
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                        <h1 className="text-2xl font-bold text-center mb-6">Create Your Store</h1>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="storeName" className="block font-medium text-gray-700 mb-1">
                                    Store Name
                                </label>
                                <input
                                    type="text"
                                    name="storeName"
                                    id="storeName"
                                    required
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block font-medium text-gray-700 mb-1">
                                    Store Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    required
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className="block font-medium text-gray-700 mb-1">
                                    Store Location
                                </label>
                                <input
                                    type="location"
                                    name="location"
                                    id="location"
                                    required
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="block font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    required
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="slug" className="block font-medium text-gray-700 mb-1">
                                    Store Slug
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    required
                                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Create Store
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const createBusiness = () => {

        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Register Your Business</h1>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="businessName" className="block font-medium text-gray-700 mb-1">
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
                            <label htmlFor="address" className="block font-medium text-gray-700 mb-1">
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
                            <label htmlFor="phoneNumber" className="block font-medium text-gray-700 mb-1">
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
                            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
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
                            <label htmlFor="country" className="block font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
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
                            onClick={registerBusiness}
                        >
                            Register Business
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            {
                loading ? <div className="flex justify-center items-center h-screen"><Spinner/>
                </div> : showCreateStore ? createStore() : createBusiness()
            }
            <ToastContainer/>
        </div>
    );
};

export default CreateStore;