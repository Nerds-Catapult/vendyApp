import { useEffect, useState } from "react";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import Loading from "../../loader/loading.tsx";
import { CiLogout } from "react-icons/ci";
import Navbar from "../../nav/Nav.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the structure of the profile data
interface ProfileProps {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  imageUrl: string | null;
}

interface expectedProps {
  status: number;
  message: string;
  token: string;
  entity: {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    imageUrl: string | null;
  };
}

const Profile = () => {
  const localStorageService = LocalStorageService.getInstance();
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerID, setCustomerID] = useState<number>();
  const [error, setError] = useState<string | null>(null);

  // Logout function with improved feedback
  const onLogout = () => {
    try {
      localStorageService.clearAllTokens();
      window.location.href = "/login";
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("An error occurred while logging out");
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    const checkuserStorage = async () => {
      const userProfile = localStorageService.readCustomerProfileData(
        "customer"
      ) as unknown as ProfileProps;
      if (!userProfile) {
        return toast.error(
          "There was a problem checking your profiile, please login again"
        );
      } else {
        return userProfile.id && setCustomerID(userProfile.id);
      }
    };
    const getProfileData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorageService.readAuthToken("customerToken");
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:4200/api/get-customer`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data: expectedProps = await response.json();
          if (data.status !== 200) {
            setError(data.message);
          } else {
            setProfileData(data.entity);
          }
        } catch (error) {
          setError("An error occurred while fetching profile data.");
        }
      } else {
        window.location.href = "/login";
      }
      setLoading(false);
    };
    getProfileData();
    checkuserStorage();
  }, [customerID, localStorageService]);

  // UI rendering
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <button
              onClick={onLogout}
              className="flex items-center text-red-500 hover:text-red-600 transition duration-200"
            >
              <CiLogout className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : profileData ? (
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Name</h2>
                <p>
                  {profileData.fullName}{" "}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Email</h2>
                <p>{profileData.email}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Phone</h2>
                <p>{profileData.phoneNumber}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Address</h2>
                <p>{profileData.address}</p>
              </div>
            </div>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
