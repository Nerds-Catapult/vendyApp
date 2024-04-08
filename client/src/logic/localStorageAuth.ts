

export class localStorageUtility{
    static writeAutToken(tokenKey: string, tokenvalue: string): void{
        localStorage.setItem(tokenKey, tokenvalue);
    }
    static readAuthToken(tokenKey: string): string | null{
        return localStorage.getItem(tokenKey);
    }
    static deleteAuthToken(tokenKey: string): void {
        localStorage.removeItem(tokenKey);
    }
}