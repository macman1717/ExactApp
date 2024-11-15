import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../environment";
import { Observable } from 'rxjs/internal/Observable';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';
  environment = environment;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.environment.apiURL}/api/login`,
      { email, password }
    );
  }

  resetPassword(email: string, newPassword: string, enteredOtp: string) {
    return this.http.post(`${this.environment.apiURL}/api/login/reset-password`, { email, newPassword, enteredOtp });
  }

  verifyOtp(email: string, otp: string) {
    console.log("Doing verify-otp");
    return this.http.post(`${this.environment.apiURL}/api/login/verify-otp`, { email, enteredOtp: otp });
  }

  requestOtp(email: string) {
    console.log("Doing request-otp called");
    return this.http.post(`${environment.apiURL}/api/login/request-otp`, { email });
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return "";
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }
}


