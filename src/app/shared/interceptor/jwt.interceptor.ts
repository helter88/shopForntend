import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(
        private jwtService: JwtService
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        if(token && (
            req.url.startsWith("/api/admin") || 
            req.url.startsWith("api/admin") ||
            req.url.startsWith("api/orders") ||
            req.url.startsWith("/api/orders") ||
            req.url.startsWith("/api/profiles") ||
            req.url.startsWith("api/profiles") ||
            req.url.startsWith("api/userData") ||
            req.url.startsWith("/api/userData")
            )) {
            req = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            })
        }
        return next.handle(req);
    }

}