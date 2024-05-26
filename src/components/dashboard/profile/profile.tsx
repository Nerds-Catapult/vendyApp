import { useEffect, useState } from "react";
import Loading from "../../loader/loading.tsx";
import { CiLogout } from "react-icons/ci";
import Navbar from "../../nav/Nav.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

interface ProfileProps {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  imageUrl: string | null;
}

interface ExpectedProps {
  status: number;
  message: string;
  token: string;
  entity: ProfileProps;
}

const Profile = () => {
 const [profileData, setProfileData] = useState<ProfileProps | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchProfileData = async () => {
   const customerToken = Cookies.get("customerToken");
   if (!customerToken) {
     window.location.href = "/auth/customer/login";
     return;
   }
   try {
     const response = await fetch(`http://localhost:4200/api/get-customer`, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${customerToken}`,
       },
       credentials: "include",
     });

     const data: ExpectedProps = await response.json();
     console.log(data.status);
     if (data.status === 200) {
       setProfileData(data.entity);
     } else if (data.status === 401) {
       toast.error("Session expired. Please login again");
     }
   } catch (error) {
     console.log(error);
     setError("An error occurred while fetching profile data");
   } finally {
     setLoading(false);
   }
 };

 const onLogout = () => {
   try {
     Cookies.remove("customerToken");
     window.location.href = "/auth/customer/login";
     toast.success("Successfully logged out");
   } catch (error) {
     toast.error("An error occurred while logging out");
   }
 };

 useEffect(() => {
   fetchProfileData();
 }, []);

 if (loading) {
   return <div>Loading...</div>;
 }

 if (error) {
   return <div>Error: {error}</div>;
 }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Profile
                </h1>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <CiLogout className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
              {loading ? (
                <Loading />
              ) : error ? (
                <p className="text-red-500 text-center text-xl">{error}</p>
              ) : profileData ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      Name
                    </h2>
                    <p className="text-gray-500">{profileData.fullName}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      Email
                    </h2>
                    <p className="text-gray-500">{profileData.email}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      Phone
                    </h2>
                    <p className="text-gray-500">{profileData.phoneNumber}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      Address
                    </h2>
                    <p className="text-gray-500">{profileData.address}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xl text-gray-500 mb-4">
                    No profile data available.
                  </p>
                  <a
                    href="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Please login again
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
