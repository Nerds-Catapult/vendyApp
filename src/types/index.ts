export interface expectedBusiness {
    id: number;
    ownerFirstName: string;
    ownerLastName: string;
    identificationNumber: string;
    phoneNumber: string;
    businessName: string;
    businessCategory: string;
    businessEmail: string;
    address: string;
    county: string;
    subCounty: string;
    ward: string;
    area: string;
    country: string;
    imageUrl: string;
}

export interface expectedBusinessInterface {
    status: number;
    message: string;
    token: string;
    entity: expectedBusiness;
}


interface customer {
    id: number;
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
    imageUrl: string;
}

export interface ExpectedCustomer {
    status: number;
    message: string;
    token: string;
    entity: customer;
}


export  interface asCloudinaryResponse {
    secure_url: string;
    url : string;
  }
