import './page.scss';
import Navbar from "../../nav/Nav.tsx";
import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
    return (
        <>
            <Navbar/>
            <div className=" bg-slate-800 layout">
                <Outlet/>
            </div>
        </>
    )
}

export default AuthLayout;