
class LocalStorageService {
    private static instance: LocalStorageService;

    private constructor() {
    }

    public static getInstance(): LocalStorageService {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = new LocalStorageService();
        }
        return LocalStorageService.instance;
    }

    public writeAuthToken(tokenKey: string, tokenValue: string): void {
        localStorage.setItem("customerToken", tokenValue);
    }

    public readAuthToken(tokenKey: string): string | null {
        return localStorage.getItem(tokenKey);
    }
    public writeCustomerProfileData(profileKey: string, customerProfile: string): void {
        localStorage.setItem(profileKey, customerProfile);
    }
    public readCustomerProfileData(key: string): string | null {
        return localStorage.getItem(key);
    }

    public clearAllTokens(): void {
        localStorage.clear();
    }

    public writeBusinessToken(tokenKey: string, businessToken: string): void {
        localStorage.setItem(tokenKey, businessToken);
    }

    public readBusinessToken(key: string): string | null {
        return localStorage.getItem(key);
    }

    //------------------------businessAdmin profile------------------------
    public writeBusinessAdminToken(tokenKey: string, businessAdminToken: string): void {
        localStorage.setItem(tokenKey, businessAdminToken);
    }
    public readBusinessAdminToken(key: string): string | null {
        return localStorage.getItem(key);
    }
    public writeAdminEmail(profileKey: string, adminEmail: string): void {
        localStorage.setItem(profileKey, adminEmail);
    }
    public readAdminEmail(key: string): string | null {
        return localStorage.getItem(key);
    }
    public deleteBusinessAdminProfileData(profileKey: string): void {
        localStorage.removeItem(profileKey);
    }

    //------------------------business profile------------------------
    public writeBusinessProfileData(profileKey: string, businessProfile: string): void {
        localStorage.setItem(profileKey, businessProfile);
    }
    public readBusinessProfileData(key: string): string | null {
        return localStorage.getItem(key);
    }
    public deleteBusinessProfileData(profileKey: string): void {
        localStorage.removeItem(profileKey);
    }
    public writeBusinessEmail(profileKey: string, businessEmail: string): void {
        localStorage.setItem(profileKey, businessEmail)
    }
    public logOut = (): void => {
        localStorage.clear();
    }
}

export default LocalStorageService;
