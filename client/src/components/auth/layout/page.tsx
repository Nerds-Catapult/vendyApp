import './page.scss';

import {Outlet} from 'react-router-dom';

const AuthLayout=()=>{
    return(
        <div className=" bg-slate-800 layout">
            <Outlet/>
        </div>
    )
}

export default AuthLayout;