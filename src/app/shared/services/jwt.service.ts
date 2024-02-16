import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

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

  notExpired(token: string): boolean {
    const tokenDecoded = jwtDecode<any>(token);
    return (tokenDecoded.exp * 1000) > new Date().getTime();
  }
}
