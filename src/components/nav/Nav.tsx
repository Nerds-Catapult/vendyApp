import logo from "../../assets/vendy.png";
import {FaShoppingCart} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {useState} from "react";

export default function Navbar() {
 const [token] = useState(localStorage.getItem('token'));

    return (
        <nav className="bg-white flex items-center px-4 pt-6 pb-3 w-full top-0 text-[19px]">
            <a href="/shop" className="flex items-center">
                <img src={logo} alt="logo" className="xl:ml-10 w-32 cursor-pointer"
                />
            </a>

        
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
                        <a href="/shop" className="text-lg">
                            Home
                        </a>
                    </li>
                    <li className="flex items-center">
                        {/*<FaHourglassEnd className="text-2xl"/>*/}
                        <a href="/auth/runerrands" className="text-lg">
                            Run Errands
                        </a>
                    </li>
                    <li className="flex items-center">
                        {/*<FaShoppingCart className="text-2xl"/>*/}
                        <a href="/auth/createstore" className="text-lg">
                            {token ? 'Admin' : 'sell With US'}
                        </a>
                    </li>
                    <li className="flex items-center">
                        <a href={'/profile'} className="text-lg">
                            <CgProfile className="text-2xl"/>
                        </a>
                    </li>
                    <li className="flex items-center">
                        <a href="/cart" className="text-lg">
                        <FaShoppingCart className="text-2xl"/>
                            {/*    cart*/}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
