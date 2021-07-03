import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('pe-login');
  }

  logout(): void {
    localStorage.removeItem('pe-login');
  }

  login(login: string): void {
    if (login.trim()) {
      localStorage.setItem('pe-login', login);
    }
  }

  getUser(): string {
    return localStorage.getItem('pe-login');
  }

}
