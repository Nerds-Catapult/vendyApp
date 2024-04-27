import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Spinner from "./components/spinner/Spinner.tsx";
import AuthLayout from "./components/auth/layout/page.tsx";
import Login from "./components/auth/login/login.tsx";
import Signup from "./components/auth/signup/signup.tsx";
import Profile from './components/dashboard/profile/profile.tsx';
import CreateStore from "./components/forms/createStore.tsx";
import BusinessAdmin from "./components/auth/businessAdmin/BusinessAdmin.tsx";
import BusinessDashBoard from "./components/dashboard/Business/BusinessDashBoard.tsx";
import Errands from "./components/dashboard/errands/errands.tsx";
import MobileIsNotSupported from "./MobileNotSupported/MobileIsNotSupported.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'create-admin',
                element: <BusinessAdmin/>
            }
        ]
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/create-store',
        element: <CreateStore/>
    },
    {
        path: '/business-dashboard',
        element: <BusinessDashBoard/>
    },
    {
        path: '/errands',
        element: <Errands/>
    },
    {
        path: '/500',
        element: <MobileIsNotSupported/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider
            router={router}
            fallbackElement={<Spinner/>}
        />
    </React.StrictMode>,
)
