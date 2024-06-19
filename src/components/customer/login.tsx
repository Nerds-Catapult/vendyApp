import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../nav/Nav";
import Cookies from "js-cookie";
import Spinner from "../spinner/Spinner";

interface FormData {
  email: string;
  password: string;
}

interface ExpectedCustomer {
  status: number;
  message: string;
  entity: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  token: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const customerToken = Cookies.get("customerToken");
    if (customerToken) {
      window.location.href = "/shop";
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4200/api/login-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data: ExpectedCustomer = await response.json();
      if (data.status === 200) {
        toast.success(data.message);
        Cookies.set("customerToken", data.token);
        window.location.href = "/shop";
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">
                Don't have an account?{" "}
                <a
                  href="/auth/customer/signup"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;
