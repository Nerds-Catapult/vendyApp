//hooks/useAuth

import {useState} from 'react';
import axios from "axios";
import LocalStorageService from "../logic/localStorageAuth.ts";


interface createUserInterface{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export const useAuth = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [user, setUser] = useState(null);

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:4200/api/customer-login', {email, password});
        const {token} = response.data;
        console.log(token)
        localStorageService.writeAuthToken('token', token);
        setUser(response.data.user);
    }

    const logOut = () => {
        localStorageService.clearAllTokens();
        setUser(null);
    }
    const createUser = async({firstName, lastName, email, password, address, phone}:createUserInterface)=>{
        const response = await axios.post('http://localhost:4200/api/customer-signup', {firstName, lastName, email, password, address, phone});
        const {token} = response.data;
        localStorageService.writeAuthToken('token', token);
        setUser(response.data.user);
        console.log(response);
    }

    const persistentFunction = () => {
        const token = localStorageService.readAuthToken('token');
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

    }

    const isAuthenticated = () => !!localStorageService.readAuthToken('token');

    return {login, logOut, isAuthenticated, createUser, persistentFunction, user};
}