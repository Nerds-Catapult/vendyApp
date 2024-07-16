


export interface VendorTypeFromServer { 
    /* 
    * This is the expected response from the server, includes profile table and vendor table
    * when a vendor is fetched
    * when a vendor is created
    * when a vendor is updated
    * vendorId and profileId are the same
    */
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string; // vendor
    isActive: boolean;
    vendor: {
        id: number;
    }
  token: string;
}


export interface ValidationAuthProps {
  accessToken: string | null;
  statusCode: number;
  error: string | null;
  message: string;
}