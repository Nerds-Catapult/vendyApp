import Spinner from "../spinner/Spinner";
import Navbar from "../nav/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

const formData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  country: "",
  city: "",
  ward: "",
};

interface expectedImageProps {
  secure_url: string;
  url: string;
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

const RunErrands: React.FC = () => {
  const [loading, setLoading] = useState(false);
    const [formProps, setFormProps] = useState(formData);
    const [file, setFile] = useState<File | null>(null);
  const notify = (message: string) => toast(message);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProps({ ...formProps, [e.target.name]: e.target.value });
  };
    
    const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0]);
    
    const handleImageUpload = async (): Promise<string> => {
      setLoading(true);
      const data = new FormData();
      data.append("file", file as Blob);
      const response = await fetch("http://localhost:4200/api/upload", {
        method: "POST",
        body: data,
      });
      return response.json();
    };

    const submitErrandRequest = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response =
          (await handleImageUpload()) as unknown as expectedImageProps;
        const data = await fetch("http://localhost:4200/api/errands", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formProps,
            image: response.secure_url || response.url,
          }),
        });
        const result = (await data.json()) as expectedState;
        if (result.state.status === 201) {
          setLoading(false);
          notify("Errand request submitted successfully");
        } else {
          setLoading(false);
          notify("An error occured, please try again");
        }
      } catch (error) {
        setLoading(false);
        notify("An error occured, please try again");
      }
    };
    

  const ErrandForms = () => {
    return (
      <div className="flex flex-col justify-center items-center h-full py-9 bg-gray-100">
        =
        <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md" onSubmit={submitErrandRequest}>
          <h1 className="text-xl font-bold text-center mb-4">
            Run Errands Form
          </h1>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label
                htmlFor="county"
                className="block font-medium text-gray-700 mb-1"
              >
                County
              </label>
              <input
                type="text"
                name="county"
                id="county"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label
                htmlFor="sub-county"
                className="block font-medium text-gray-700 mb-1"
              >
                Sub County/Constituency
              </label>
              <input
                type="text"
                name="sub-county"
                id="sub-county"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label
                htmlFor="ward"
                className="block font-medium text-gray-700 mb-1"
              >
                Ward
              </label>
              <input
                type="text"
                name="ward"
                id="ward"
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue -500 focus:border-blue-500"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block font-medium text-gray-700 mb-1"
              >
                Profile Picture
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpg, image/jpeg"
                  required
                  className="mt-1"
                //   onChange={(e) => {
                //     const file = e.target.files![0];
                //     const reader = new FileReader();
                //     reader.readAsDataURL(file);
                //     reader.onloadend = () => {
                //       setFormData({
                //         ...formData,
                //         image: reader.result as string,
                //       });
                //     };
                                //   }}
                                onChange={handleSelectFile}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
          <span className="ml-2 text-gray-500"></span>
        </form>
        <ToastContainer />
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        ErrandForms()
      )}
      <ToastContainer />
    </div>
  );
};

export default RunErrands;
