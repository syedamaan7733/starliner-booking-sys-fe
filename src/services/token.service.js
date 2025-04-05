export class TokenService {
  constructor(tokenKey) {
    this.TOKEN_KEY = tokenKey;
  }

  setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

export const authToken = new TokenService("access_token");
