import { useEffect, useState } from 'react';
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import axios from 'axios';
import Loading from "../../loader/loading.tsx";
import { CiLogout } from "react-icons/ci";
import Navbar from "../../nav/Nav.tsx";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import './Profile.scss'; // Add a CSS file for custom styles

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
            const profileData = localStorageService.readProfileData('profileData');
            if (profileData) {
                setProfileData(JSON.parse(profileData));
                setLoading(false);
            } else {
                const token = localStorageService.readAuthToken('token');
                if (token) {
                    try {
                        const response = await axios.get('http://localhost:4200/api/getByToken', {
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
        };

        getProfileData();
    }, [localStorageService]);

    // UI rendering
    return (
        <>
            <Navbar />
            <div className="profile-container flex justify-center items-center bg-gray-700 h-[100vh]">
                <div className="profile-card bg-slate-950 rounded-lg shadow-md p-6 md:p-8 lg:p-10 text-white w-full max-w-lg">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="profile-header flex flex-col md:flex-row items-center md:items-start">
                                {/* Avatar with fallback image */}
                                <div className="avatar-container w-32 h-32 md:mr-8 mb-4 md:mb-0">
                                    <img
                                        src={profileData?.avatar || "https://via.placeholder.com/150"}
                                        alt={profileData?.firstName || "Avatar"}
                                        className="avatar w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="profile-info flex-1">
                                    {/* Displaying user profile information */}
                                    <h1 className="profile-name text-2xl font-bold">{profileData?.firstName} {profileData?.lastName}</h1>
                                    <p className="profile-email text-lg">Email: {profileData?.email}</p>
                                    <p className="profile-phone text-lg">Phone: {profileData?.phone}</p>
                                    <p className="profile-address text-lg">Address: {profileData?.address}</p>
                                    <p className="profile-orders text-lg">Total Orders: {profileData?.orders}</p>
                                </div>
                            </div>
                            {/* Logout button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    className="logout-button bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={onLogout}
                                >
                                    <CiLogout className="mr-2" /> Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Profile;
