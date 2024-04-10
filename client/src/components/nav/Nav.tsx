import logo from "../../assets/vendy.png";
import {useEffect, useState} from "react";
import {FaShoppingCart} from "react-icons/fa";
import LocalStorageService from "../../logic/localStorageAuth";
import {CgProfile} from "react-icons/cg";

export default function Navbar() {
    const [profileState, setProfileState] = useState('');
    const localStorageService = LocalStorageService.getInstance();

    useEffect(() => {
        const token = localStorageService.readAuthToken("token");
        if (token) {
            setProfileState('/profile');
        } else {
            setProfileState('auth/login');
        }
    }, [localStorageService])
    return (
        <nav className="bg-white flex items-center px-4 pt-6 pb-3 w-full top-0 text-[19px]">
            <img src={logo} alt="logo" className="xl:ml-10 w-32"/>

            <form
                action=""
                className="hidden  lg:flex flex-row-reverse gap-2 xl:pl-20"
            >
                <input
                    type="text"
                    placeholder="Search for products"
                    required
                    className="px-2 py-1"
                />
                <button type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </form>
            <div className="absolute float-right right-10 flex flex-col">
                <ul className="text-text hidden flex-col md:flex-row md:gap-4 lg:gap-10 md:flex lg:ml-48 mt-10 md:mt-0 text-center">
                    <li className="flex items-center">
                        {/*<FaHome className="text-2xl"/>*/}
                        <a href="/" className="text-lg">
                            Home
                        </a>
                    </li>
                    <li className="flex items-center">
                        {/*<FaHourglassEnd className="text-2xl"/>*/}
                        <a href="/errands" className="text-lg">
                            Run Errands
                        </a>
                    </li>
                    <li className="flex items-center">
                        {/*<FaShoppingCart className="text-2xl"/>*/}
                        <a href="/store" className="text-lg">
                            Create Store
                        </a>
                    </li>
                    <li className="flex items-center">
                        <a href={profileState} className="text-lg">
                            <CgProfile className="text-2xl"/>
                            {/*Profile*/}
                        </a>
                    </li>
                    <li className="flex items-center">
                        <FaShoppingCart className="text-2xl"/>
                        <a href="/cart" className="text-lg">
                            {/*    cart*/}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
