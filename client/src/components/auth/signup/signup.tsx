const Signup = () => {
    return (
        <div className="bg-white login rounded-xl shadow-xl w-1/4 h-fit mx-auto p-5">
            <h1 className="text-center capitalize">Create An account</h1>
            <form className="bg-gray-100 p-10">
                <div className="mb-5">
                    <label htmlFor="email" className="block font-bold">
                        Full Names
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
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
                    <label htmlFor="email" className="block font-bold">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block font-bold">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
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
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block font-bold">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md cursor-pointer">
                    Login
                </button>
            </form>
            <p className="text-center mt-5">
                Have an account? <a href="login" className="text-blue-500">
                Login
            </a>
            </p>
        </div>
    );
};

export default Signup;