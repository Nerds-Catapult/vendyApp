import './page.scss';
import Navbar from "../../nav/Nav.tsx";
import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
    return (
        <>
            <Navbar/>
            <div className=" w-full h-fit overflow-x-hidden"> {/* TODO:potential ui break */}
                <Outlet/>
            </div>
        </>
    )
}

export default AuthLayout;