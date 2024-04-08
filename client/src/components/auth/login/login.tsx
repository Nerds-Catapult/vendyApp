const Login = () => {
  return (
    <div className="bg-white login rounded-xl shadow-xl w-1/4 h-2/5 mx-auto p-5">
      <h1 className="text-center capitalize">Welcome Back</h1>
      <form className="bg-gray-100 p-10">
        <div className="mb-5">
          <label htmlFor="email" className="block font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-5">
        Don't have an account?{" "}
        <a href="signup" className="text-blue-500">
          Signup
        </a>
      </p>
    </div>
  );
};

export default Login;
