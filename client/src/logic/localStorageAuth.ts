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
}

export default LocalStorageService;