import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  constructor() {
  }

  isLggedIn(): boolean {
    return !!localStorage.getItem('pe-login');
  }

  logout(): void {
    localStorage.removeItem('pe-login');
  }

  setUser(login: string): void {
    if (login.trim()) {
      localStorage.setItem('pe-login', login);
    }
  }

}
