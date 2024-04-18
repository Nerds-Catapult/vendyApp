import { useEffect, useState } from 'react';
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import axios from 'axios';
import Loading from "../../loader/loading.tsx";
import { CiLogout } from "react-icons/ci";
import Navbar from "../../nav/Nav.tsx";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Define the structure of the profile data
interface ProfileProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
    orders?: number;
}

const Profile = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [profileData, setProfileData] = useState<ProfileProps | null>(null);
    const [loading, setLoading] = useState(true);

    // Logout function with improved feedback
    const onLogout = () => {
        try {
            localStorageService.clearAllTokens();
            window.location.href = '/auth/login';
            toast.success('Successfully logged out');
        } catch (error) {
            toast.error('An error occurred while logging out');
        }
    };

    // Fetch profile data on component mount
    useEffect(() => {
        const getProfileData = async () => {
                const token = localStorageService.readAuthToken('token');
                if (token) {
                    try {
                        const response = await axios.get('http://localhost:4200/api/get-customer-by-token', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        const { firstName, lastName, email, phone, address, avatar, orders }: ProfileProps = response.data;
                        setProfileData({ firstName, lastName, email, phone, address, avatar, orders });
                    } catch (error) {
                        console.error('Failed to fetch profile data:', error);
                        toast.error('Failed to fetch profile data.');
                    }
                    setLoading(false);
                } else {
                    console.log('No token found');
                    window.location.href = '/auth/login';
                }
            }

        getProfileData().then(r => r);
    }, [localStorageService, profileData]);

    // UI rendering
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 h-screen">
                <div className="container mx-auto p-4">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">Profile</h1>
                            <button onClick={onLogout} className="flex items-center text-red-500">
                                <CiLogout />
                                <span className="ml-2">Logout</span>
                            </button>
                        </div>
                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <img src={profileData?.avatar || '/avatar.png'} alt="avatar" className="w-16 h-16 rounded-full" />
                                    <div className="ml-4">
                                        <h2 className="text-xl font-semibold">{profileData?.firstName}</h2>
                                        <p className="text-gray-500">{profileData?.email}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Contact Information</h3>
                                    <div className="mt-2">
                                        <p><span className="font-semibold">Phone:</span> {profileData?.phone}</p>
                                        <p><span className="font-semibold">Address:</span> {profileData?.address}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Orders</h3>
                                    <p>Orders: {profileData?.orders || "you have placed no orders"} </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;
