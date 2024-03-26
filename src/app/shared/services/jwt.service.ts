import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";import { BehaviorSubject } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isLoggedInUpdates = this.isLoggedInSubject.asObservable();

  adminAccess = false;

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.isLoggedInSubject.next(true);
  }

  removeToken() {
    localStorage.removeItem("token");
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return token !== null && this.notExpired(token);
  }

  private notExpired(token: string): boolean {
    const tokenDecoded = jwtDecode<any>(token);
    return (tokenDecoded.exp * 1000) > new Date().getTime();
  }

  setAminAccess(adminAccess: boolean) {
    this.adminAccess = adminAccess;
  }

  getAdminAccess(): boolean {
    return this.adminAccess;
  }
}
