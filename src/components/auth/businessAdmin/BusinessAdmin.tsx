import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import Spinner from "../../spinner/Spinner.tsx";


const CreateBusinessAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const storageService = LocalStorageService.getInstance();

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (storageService.readBusinessAdminToken("businessAdmin")) {
      window.location.href = "/create-store";
    }
  }, [storageService]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true)
    const response = await fetch(
      "http://localhost:4200/api/create-business-admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      setLoading(false)
    } else {
      toast.success("Admin Account Created Successfully");
      storageService.writeAdminEmail("adminEmail", data.email);
      storageService.writeBusinessAdminToken("businessAdmin", data.token);
      const auth = storageService.readBusinessAdminToken("businessAdmin");
      window.location.href = "";
      if (!auth) {
        toast.error("Please try again, could not authenticate");
      } else {
        window.location.href = "/create-store";
      }
    }
  }
  const RegisterBusinessAdmin = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Create An Admin Account
          </h1>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 mb-1"
              >
                Admin Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div>
                <span
                  className={passwordError ? "text-red-500" : "text-green-500"}
                >
                  {passwordError}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Your Admin Account
            </button>
          </div>
          <div className="mt-7 flex w-full justify-center">
            <span className="text-center text-black">
                Already Have an account?
                <a href="/login-admin" className="text-blue-700">Login</a>
            </span>
          </div>
        </form>
      </>
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? <Spinner /> : RegisterBusinessAdmin()}
      <ToastContainer />
    </div>
  );
};

export default CreateBusinessAdmin;
