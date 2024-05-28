



 interface expectedBusiness {
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
