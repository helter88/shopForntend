import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  adminAccess = false;

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("token", token);
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
