import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";


interface AuthState {
    isAuthenticated: boolean;
    status: number;
    message: string;
    token: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
}

interface expectedCustomerResponse {
    status: number;
    message: string;
    token: string;
    entity: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
    }
}

export const registerCustomer = createAsyncThunk("customer/register", async (customer: { email: string, password: string, firstName: string, lastName: string, phone: string, address: string }) => {
    const response = await fetch("http://localhost:4200/api/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    const data: expectedCustomerResponse = await response.json()
    return data
})

export const loginCustomer = createAsyncThunk("customer/login", async (customer: { email: string, password: string }) => {
    const response = await fetch("http://localhost:4200/api/login-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    const data: expectedCustomerResponse = await response.json()
    return data
})


const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        isAuthenticated: false,
        status: 0,
        message: "",
        token: null,
        user: {}
    } as unknown as AuthState,
    reducers: {
        createCustomer: (state, action: PayloadAction<AuthState>) => {
            state.isAuthenticated = true;
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.token = action.payload.token;
            state.user = action.payload.user;
        }
    }
})


export const { createCustomer } = customerSlice.actions;
export default customerSlice.reducer;