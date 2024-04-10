import React from 'react';

const CreateStore: React.FC = () => {
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
                    {/*<div>*/}
                    {/*  <label htmlFor="description" className="block font-medium text-gray-700 mb-1">*/}
                    {/*    Business Description*/}
                    {/*  </label>*/}
                    {/*  <textarea*/}
                    {/*    name="description"*/}
                    {/*    id="description"*/}
                    {/*    required*/}
                    {/*    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"*/}
                    {/*    rows={3}*/}
                    {/*  ></textarea>*/}
                    {/*</div>*/}
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
                    </div><div>
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
    );
};

export default CreateStore;