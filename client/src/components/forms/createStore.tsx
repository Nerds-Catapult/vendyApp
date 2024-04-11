import React, {useEffect, useState} from 'react';
import LocalStorageService from "../../logic/localStorageAuth.ts";
import Spinner from '../spinner/Spinner';
import * as axios from 'axios';


const CreateStore: React.FC = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showCreateStore, setShowCreateStore] = useState(false);
    const [returnedBusinessString, setReturnedBusinessString] = useState('');


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
        if (returnedBusinessString) {
            setShowCreateStore(true);
        }
    }, [returnedBusinessString]);

    const registerBusiness= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            //setLoading(false);
            //setReturnedBusinessString(response.data);
        } catch (err) {
            setLoading(false);
            setError(err as unknown as string);
        }
    }
    const createStore = () => {
        return (
            <div>
                <h1>Register Your Business</h1>
                <form>
                    <label htmlFor="storeName">Business Name</label>
                    <input type="text" id="storeName" name="storeName" required/>
                    <label htmlFor="description">Business Description</label>
                    <textarea id="description" name="description" required/>
                    <label htmlFor="address">Business Address</label>
                    <input type="text" id="address" name="address" required/>
                    <label htmlFor="phone">Business Phone</label>
                    <input type="tel" id="phone" name="phone" required/>
                    <label htmlFor="email">Business Email</label>
                    <input type="email" id="email" name="email" required/>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" required/>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" required/>
                    <button type="submit">Register Business</button>
                </form>
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
                            <label htmlFor="storeName" className="block font-medium text-gray-700 mb-1">
                                Business Name
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
                                Business Address
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
                            <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                                Business Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                required
                                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            <label htmlFor="city" className="block font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
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
                            Register Business
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div>
            {
                loading ? <Spinner/> : error ? <div>{error}</div> : success ?
                    <div>{success}</div> : showCreateStore ? createStore() : createBusiness()
            }
        </div>
    );
};

export default CreateStore;