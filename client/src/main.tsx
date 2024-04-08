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
                path: 'profile',
                element: <Profile/>
            }
        ]
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
