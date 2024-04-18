import React, { useState } from 'react';

const CreateBusinessAdmin = () => {
    const [file, setFile ] = useState<File | undefined>();
    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    function handleImageChange(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }
        setFile(target.files[0]);
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value,
        });
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(admin, file);
        const formData = new FormData();
        formData.append("name", admin.name);
        formData.append("email", admin.email);
        formData.append("phone", admin.phone);
        formData.append("password", admin.password);
        formData.append("confirmPassword", admin.confirmPassword);
        formData.append("image", file as Blob);
        try {
            const response = await fetch("http://localhost:4200/api/create-business-admin", {
                method: "POST",
                body: formData,
            });
            console.log(response.json());
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Create An Admin Account</h1>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700 mb-1">Admin Name</label>
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
                        <label htmlFor="email" className="block font-medium text-gray-700 mb-1">Email</label>
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
                        <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">Phone</label>
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
                        <label htmlFor="password" className="block font-medium text-gray-700 mb-1">Password</label>
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
                        <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div>
                            {/*<span className={passwordError ? "text-red-500" : "text-green-500"}>{passwordError}</span>*/}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image" className="block font-medium text-gray-700 mb-1">Profile Picture</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/png, image/jpeg, image/jpg"
                            required
                            onChange={handleImageChange}
                        />
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
                    <span className="text-center text-purple-700">
                        Already Have an account?
                        {/*<button className="text-blue-500" onClick={() => setShowLogin(true)}>Login</button>*/}
                    </span>
                </div>
            </form>
        </div>
    );
};

export default CreateBusinessAdmin;
