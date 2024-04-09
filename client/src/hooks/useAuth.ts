//hooks/useAuth

import {useState} from 'react';
import axios from "axios";
import LocalStorageService from "../logic/localStorageAuth.ts";


export const useAuth = () => {
    const localStorageService = LocalStorageService.getInstance();
    const [user, setUser] = useState(null);

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:4200/api/customer-login', {email, password});
        const {token} = response.data;
        localStorageService.writeAuthToken('token', token);
        setUser(response.data.user);
    }

    const logOut = () => {
        localStorageService.clearAllTokens();
        setUser(null);
    }
    const createUser = async()=>{}

    const isAuthenticated = () => !!localStorageService.readAuthToken('token');

    return {login, logOut, isAuthenticated, user};
}