


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



export interface Store {
  id: number;
  storeName: string;
  storeLocation: string;
  storeAddress: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  storeLogo: string 
  county: string;
  ward: string;
  isActive: boolean;
  vendorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}[]



export interface ExpectedAsStoreProps extends Store  {
  message: string;
  httpStatus: number;
}

export interface checkIfVendorHasStoreReturnsBoolean {
  hasStore: boolean;
  store: Store | null | undefined;
}

export interface ExpectedAStoreCategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}[];

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




export interface loginHttpResponse {
  message: string;
  httpStatus: number;
  accessToken: string;
}


export interface ExpectedAsCustomerTypes {
  statusCode: number;
  message: string;
  data: {
    id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: number;
    profileId: number;
    orders: {
      id: number;
      orderNumber: string;
      orderStatus: string;
    }[] | []
  }
  } 
}
/* 
<div className="flex-shrink-0">
                <Link href="#" className="group" prefetch={false}>
                  <div className="relative h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg"
                      alt="Store 6"
                      width={128}
                      height={128}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-2 text-center font-medium">
                    Kitchen Essentials
                  </div>
                </Link>
              </div>
*/