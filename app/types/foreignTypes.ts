


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
  payload: {
    email: string;
    role: string;
    id: number;
    iat: number;
    exp: number;
  } | null
  error: string | null
  message: string
  statusCode: number
}



export interface ReturnedStorePropsFromserver {
  id: number;
  storeName: string;
  storeLocation: string;
  storeAddress: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  county: string;
  ward: string;
  isActive: boolean;
  vendorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}


export interface checkIfVendorHasStoreReturnsBoolean {
  hasStore: boolean;
  store: ReturnedStorePropsFromserver | null | undefined;
}

export interface ExpectedAStoreCategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
[];

export interface ExpectedAsCloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
  eager: [];
  eager_async: boolean;
  eager_notification_url: string;
  customCoordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ExpectedAsStoreProps {
  httpStatus: number;
  message: string;
  data: {
    id: number;
    storeName: string;
    storeLocation: string;
    storeAddress: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    county: string;
    ward: string;
    isActive: boolean;
    vendorId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
}