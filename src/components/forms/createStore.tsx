import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from "react-toastify";
import LocalStorageService from "../../logic/localStorageAuth.ts";
import Spinner from '../spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../nav/Nav.tsx";


interface expectedProps {
    secure_url: string;
    url: string;
}

interface importedState{
    state: {
        isBusinessExists: boolean;
    }
}
interface expectedState {
    state: {
        isAuthenticated: boolean;
    status: number;
    message: string;
    email: string;
    token: string | null;
   }
  
}
  
const CreateStore: React.FC = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [loading, setLoading] = useState(false);
    const [adminId, setAdminId] = useState('');

    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const email = localStorageService.readAdminEmail('adminEmail');
        async function fetchAdminId() {
            const response = await fetch(`https://vendy-server.onrender.com/api/get-admin/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            data.id && setAdminId(data.id);
        }
        fetchAdminId();
    }, [localStorageService])

    useEffect(() => {
        const email = localStorageService.readAdminEmail('adminEmail');
        async function checkIfAdminHasBusiness() {
            setLoading(true);
            const response = await fetch(`https://vendy-server.onrender.com/api/validateBusinessByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const businessState: importedState = data;
            if (businessState.state.isBusinessExists === true) {
                window.location.href = '/business-dashboard';
            }
            setLoading(false);
        }
        checkIfAdminHasBusiness();
    }, [localStorageService])


    const [file, setFile] = useState(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files[0])

    const handleUpload = async () : Promise< string> => {
        setLoading(true);
        const data = new FormData();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data.append('file', file);
      const response = await fetch('https://vendy-server.onrender.com/api/upload', {
            method: 'POST',
            body: data
        })
        return response.json()
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'businessName') {
            setBusinessName(value);
        } else if (name === 'address') {
            setAddress(value);
        } else if (name === 'phoneNumber') {
            setPhoneNumber(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'country') {
            setCountry(value);
        } else {
            setCity(value);
        }
    }




    async function registerBusiness(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await handleUpload() as unknown as expectedProps;
            const data = await fetch('https://vendy-server.onrender.com/api/create-business', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: businessName,
                        phoneNumber: phoneNumber,
                        address,
                        email,
                        country,
                        city,
                        adminId,
                        imageUrl: response.secure_url
                    })
                });
            const res:expectedState= await data.json();
            if (res.state.status == 201) {
                toast.success(res.state.message);
                localStorageService.writeBusinessEmail("businessEmail", res.state.email)
                window.location.href = "/business-dashboard"
            } else {
                toast.error(res.state.message);
                setLoading(false)
            }

            setLoading(false);
        } catch (e) {
            console.log({"error": e});
            setLoading(false);
            toast.error('Business registration failed, Please try again');
        }
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
                        <div>
                            <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
                                Business Logo
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="/image/png jpg jpeg"
                                    required
                                    onChange={handleSelectFile}
                                />
                            </label>
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
                    <span className="ml-2 text-gray-500">
                        Already have an account? <a href="/login-business" className="text-blue-500">Login</a>
                    </span>
                </form>
                <ToastContainer/>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            {
                loading ?  <div className="flex justify-center items-center h-screen"><Spinner/></div> : createBusiness()
            }
            <ToastContainer/>
        </div>
    );
};

export default CreateStore;