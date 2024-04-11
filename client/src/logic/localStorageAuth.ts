

interface profileProps{
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
}

class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

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

  public deleteAuthToken(tokenKey: string): void {
    localStorage.removeItem(tokenKey);
  }

  public clearAllTokens(): void {
    localStorage.clear();
  }
  public cacheProfileData(profileData: profileProps): void {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }
  public readProfileData(key: string): string | null {
    return localStorage.getItem(key);
  }
    public deleteProfileData(key: string): void {
        localStorage.removeItem(key);
    }
  public cacheBusinessToken(businessToken: string ): void {
    localStorage.setItem("businessToken", JSON.stringify(businessToken));
  }
  public readBusinessToken(key: string): string | null {
    return localStorage.getItem(key);
  }
}

export default LocalStorageService;