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

export const useAuth = () => {
    const localStorageService = LocalStorageService.getInstance();


    const login = async (email: string, password: string) => {
        const response = await axios.post('https://goose-merry-mollusk.ngrok-free.app/api/login-customer', {email, password});
        const {token} = response.data;
        console.log(token)
        localStorageService.setItem("token", token);
    }

    const logOut = () => {
        localStorageService.clearAllTokens();
        // localStorageService.
    }
    const createCustomer = async ({firstName, lastName, email, password, address, phone}: createCustomerRequest) => {
        const response = await axios.post('https://goose-merry-mollusk.ngrok-free.app/api/create-customer', {
            firstName,
            lastName,
            email,
            password,
            address,
            phone
        });
        const {token} = response.data;
        localStorageService.setItem("token", token);
        console.log(response);
    }


    const CreateBusiness = async ({
      businessName,
      phoneNumber,
      email,
      address,
      city,
      country,
    }: createBusinessInterface) => {
      const userAuth = localStorageService.getItem("token");
      const response = await axios.post(
        "https://goose-merry-mollusk.ngrok-free.app/api/create-business",
        {
          businessName,
          phoneNumber,
          email,
          address,
          city,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${userAuth}`,
          },
        }
      );
      const token = response.data.businessToken;
      localStorageService.writeBusinessToken("businessToken", token);
      return response;
    };

    const loginAdmin = async (email: string, password: string) => {
      const response = await axios.post(
        "https://goose-merry-mollusk.ngrok-free.app/api/login-business-admin",
        { email, password }
      );
      const { token } = response.data;
      localStorageService.setItem("token", token);
    };

    const isAuthenticated = () => !!localStorageService.getItem("token");

    return {
        login,
        logOut,
        isAuthenticated,
        createCustomer,
        CreateBusiness,
        loginAdmin
    };
}