// Date: 14/04/2024
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
        localStorage.setItem(tokenKey, tokenValue);
    }

    public readAuthToken(tokenKey: string): string | null {
        return localStorage.getItem(tokenKey);
    }

    public clearAllTokens(): void {
        localStorage.clear();
    }

    public writeBusinessToken(tokenKey: string, businessToken: string): void {
        localStorage.setItem(tokenKey, JSON.stringify(businessToken));
    }

    public readBusinessToken(key: string): string | null {
        return localStorage.getItem(key);
    }

    //------------------------businessAdmin profile------------------------
    public writeBusinessAdminToken(tokenKey: string, businessAdminToken: string): void {
        localStorage.setItem(tokenKey, JSON.stringify(businessAdminToken));
    }
    public readBusinessAdminToken(key: string): string | null {
        return localStorage.getItem(key);
    }
}

export default LocalStorageService;