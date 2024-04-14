//hooks/useAuth

import {useState} from 'react';
import axios from "axios";
import LocalStorageService from "../logic/localStorageAuth.ts";


interface createUserInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

interface createBusinessInterface {
    businessName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    country: string;
}

interface registerStoreInterface {
    name: string;
    phoneNumber: string;
    address: string;
    location: string;
    country: string;
    storeSlug: string
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
    const createUser = async ({firstName, lastName, email, password, address, phone}: createUserInterface) => {
        const response = await axios.post('http://localhost:4200/api/customer-signup', {
            firstName,
            lastName,
            email,
            password,
            address,
            phone
        });
        const {token} = response.data;
        localStorageService.writeAuthToken('token', token);
        setUser(response.data.user);
        console.log(response);
    }
    const CreateBusiness = async ({businessName, phoneNumber, email, address,city, country}:createBusinessInterface) => {
        const userAuth =  localStorageService.readAuthToken('token');
        const response = await axios.post('http://localhost:4200/api/create-business', {
            businessName,
            phoneNumber,
            email,
            address,
            city,
            country,
        }, {
            headers: {
                Authorization: `Bearer ${userAuth}`
            }
        });
        const token = response.data.businessToken
        localStorageService.writeBusinessToken('businessToken', token);
        return response;
    }

    const registerStore =  async({name, phoneNumber,address,location,country,storeSlug}:registerStoreInterface) => {

    }
    const persistentFunction = () => {
        const token = localStorageService.readAuthToken('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

    }

    const isAuthenticated = () => !!localStorageService.readAuthToken('token');

    return {login, logOut, isAuthenticated, createUser, persistentFunction, CreateBusiness, user};
}