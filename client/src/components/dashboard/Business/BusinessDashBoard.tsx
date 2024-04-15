import {useEffect, useState} from "react";
import LocalStorageService from "../../../logic/localStorageAuth.ts";
import {IoIosOptions} from "react-icons/io";
import {FaBell} from "react-icons/fa";
import {AiOutlineUser} from "react-icons/ai";


const BusinessDashBoard = () => {
    const localStorage = LocalStorageService.getInstance()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <nav className=" p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo or brand */}
                    <a href="#" className="text-white font-bold hidden">Brand</a>

                    {/* Notification bell (hidden on mobile) */}
                    <div className="lg:flex space-x-4">
                        <button className="text-white bg-slate-700 p-2 rounded-full">
                            <AiOutlineUser/>
                        </button>
                        <button className="text-white p-2 bg-slate-700 rounded-full">
                            {/* You can use an icon here */}
                            <FaBell/>
                        </button>
                    </div>

                    {/* Desktop menu (hidden on mobile) */}
                    <div className="hidden lg:flex space-x-4">
                        <a href="#" className="text-white">Home</a>
                        <a href="#" className="text-white">About</a>
                        <a href="#" className="text-white">Contact</a>
                    </div>

                    {/* Mobile menu toggle button (hidden on desktop) */}
                    <div className="lg:hidden">
                        <button onClick={toggleMobileMenu} className="text-white">
                            {/* You can use an icon here */}
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

           </section>
        </div>
    );
}


export default BusinessDashBoard;