

import {useEffect, useState} from 'react';
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import axios from 'axios';
import Loading from "../../loader/loading.tsx";
import {CiLogout} from "react-icons/ci";
import Navbar from "../../nav/Nav.tsx";

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

    const onLogout = () => {
        localStorageService.clearAllTokens();
        // window.location.href = '/auth/login';
    }
    useEffect(() => {
        const getProfileData = async () => {
            const profileData = localStorageService.readProfileData('profileData');
            if (profileData) {
                setProfileData(JSON.parse(profileData));
            }
            if (!profileData) {
                const token = localStorageService.readAuthToken('token');
                if (token) {
                    const response = await axios.get('http://localhost:4200/api/getByToken',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    const {firstName, lastName, email, phone, address, avatar, orders}: ProfileProps = response.data;
                    setProfileData({firstName, lastName, email, phone, address, avatar, orders});
                } else {
                    console.log('No token found');
                    window.location.href = '/auth/login';
                }
            }
        };
        getProfileData().then(r => r);
    }, [localStorageService]);
    return (
        <>
            <Navbar/>
            <div className="profile-container flex justify-center items-center bg-gray-700 h-[100vh]">
                <div className="bg-slate-950 rounded-lg shadow-md p-6 md:p-8 lg:p-10 text-white w-[50%]">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <div className="w-32 h-32 md:mr-8 mb-4 md:mb-0">
                            <img
                                src={profileData?.avatar || "https://www.gravatar.com/avatar/"}
                                alt={"name"}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            {
                                profileData ? (
                                    <div className="space-y-2">
                                        <h1 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h1>
                                        <p className="text-lg">Email: {profileData.email}</p>
                                        <p className="text-lg">PhoneNumber:{profileData.phone}</p>
                                        <p className="text-lg">Address:{profileData.address}</p>
                                        <p className="text-lg">Total Orders: {profileData.orders}</p>
                                    </div>
                                ) : (
                                    <Loading/>
                                )

                            }
                        </div>
                    </div>
                    <div className="mt-20">
                        <CiLogout
                            className="text-3xl cursor-pointer"
                            onClick={onLogout}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;