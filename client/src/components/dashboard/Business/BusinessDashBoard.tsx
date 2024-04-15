import {useEffect, useState} from "react";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import {IoIosOptions} from "react-icons/io";
import {FaBell, FaRegAddressCard} from "react-icons/fa";
import {AiOutlineClose, AiOutlineUser} from "react-icons/ai";
import {VscLibrary} from "react-icons/vsc";
import {MdCollections, MdShoppingCartCheckout} from "react-icons/md";
import {IoPeopleSharp} from "react-icons/io5";
import {TiUserDeleteOutline} from "react-icons/ti";


const BusinessDashBoard = () => {
    const localStorage = LocalStorageService.getInstance()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (!localStorage.readBusinessAdminToken('BusinessToken')) {
            window.location.href = '/auth/create-admin';
        }
    }, [localStorage])
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <div className="bg-slate-800 h-screen text-white
          w-full">
            <nav className="p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo or brand */}
                    <a href="#" className="text-white font-bold hidden">Vendy Admin</a>

                    <div className="hidden lg:flex space-x-4">
                        <a href="#" className="text-white">DashBoard</a>
                    </div>
                    <div className="lg:flex space-x-4 h-fit flex items-center">
                        <button className="text-white bg-slate-700 p-2 rounded-full h-fit">
                            <FaBell className=" text-center text-2xl "/>
                        </button>
                        <button className="text-white p-4 bg-slate-700 rounded-2xl w-[200px] flex items-center gap-5">
                            <AiOutlineUser className=""/> <span>Admin</span>
                        </button>
                    </div>
                    <div className="lg:hidden">
                        <button onClick={toggleMobileMenu} className="text-white">
                            <IoIosOptions/>
                        </button>
                    </div>
                </div>

                {/* Mobile menu (visible only when isMobileMenuOpen is true and on mobile) */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden p-4">
                        <a href="#" className="block text-white mb-2">Home</a>
                        <a href="#" className="block text-white mb-2">About</a>
                        <a href="#" className="block text-white">Contact</a>
                    </div>
                )}
            </nav>
            <section className="sm:rounded">
                <div className="container mx-auto p-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 bg-slate-700 rounded-full"
                    >
                        {isSidebarOpen ? <AiOutlineClose size={24}/> : <IoIosOptions size={24}/>}
                    </button>

                    <div className="flex">
                        <div
                            className={`fixed top-0 left-0 h-screen z-10 bg-slate-900 w-80 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}>
                            <a href="#" className="text-white font-bold block mb-6 p-8">Vendy Admin</a>
                            <div className="space-y-12">
                                < div className="space-y-4 pl-8 ">
                                    <h1 className="font-bold font-serif">Catalogue</h1>
                                    <a href="#" className="flex text-white mb-2 gap-5 items-center p-3"><VscLibrary/>Products</a>
                                    <a href="#"
                                       className="flex text-white mb-2 gap-5 items-center p-3"><MdShoppingCartCheckout/>Orders</a>
                                    <a href="#" className="flex text-white mb-2 gap-5 items-center p-3"><MdCollections/>Collections</a>
                                </div>

                                < div className="space-y-4 pl-8 ">
                                    <h1 className="font-bold font-serif">CUSTOMERS</h1>
                                    <a href="#" className="flex text-white mb-2 gap-5 items-center p-3"><IoPeopleSharp/>Products</a>
                                    <a href="#"
                                       className="flex text-white mb-2 gap-5 items-center p-3"><FaRegAddressCard/>Add
                                        Customers</a>
                                    <a href="#"
                                       className="flex text-white mb-2 gap-5 items-center p-3"><TiUserDeleteOutline/>Delete
                                        Customer</a>
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="ml-0 lg:ml-64 p-4"> {/* Adjust margin when sidebar is open */}
                            <h1 className="text-2xl font-bold hidden lg:block">Welcome to your Business Dashboard</h1>
                            <p className="text-gray-400 hidden lg:block">Manage your business here</p>
                            {/* ... rest of your content */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default BusinessDashBoard;