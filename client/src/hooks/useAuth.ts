//hooks/useAuth

import axios from "axios";
import LocalStorageService from "../logic/localStorageAuth.ts";


interface createCustomerRequest {
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

interface createBusinessAdminInterface {
    name: string;
    email: string;
    phone: string;
    password: string;
}

// interface registerStoreInterface {
//     name: string;
//     phoneNumber: string;
//     address: string;
//     location: string;
//     country: string;
//     storeSlug: string
// }

export const useAuth = () => {
    const localStorageService = LocalStorageService.getInstance();


    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:4200/api/login-customer', {email, password});
        const {token} = response.data;
        console.log(token)
        localStorageService.writeAuthToken('token', token);
    }

    const logOut = () => {
        localStorageService.clearAllTokens();
        // localStorageService.
    }
    const createCustomer = async ({firstName, lastName, email, password, address, phone}: createCustomerRequest) => {
        const response = await axios.post('http://localhost:4200/api/create-customer', {
            firstName,
            lastName,
            email,
            password,
            address,
            phone
        });
        const {token} = response.data;
        localStorageService.writeAuthToken('token', token);
        console.log(response);
    }
    const createBusinessAdmin = async ({name, email, phone, password}: createBusinessAdminInterface) => {
        const response = await axios.post('http://localhost:4200/api/create-business-admin', {
            name,
            email,
            phone,
            password
        });
        const {token} = response.data;
        localStorageService.writeBusinessAdminToken('businessAdminToken', token);
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


    const isAuthenticated = () => !!localStorageService.readAuthToken('token');

    return {login,
        logOut,
        isAuthenticated,
        createCustomer,
        CreateBusiness,
        createBusinessAdmin
    };
}