import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { JwtService } from "../services/jwt.service";

export const adminAuthorizedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const jwtService = inject(JwtService);
    const router = inject(Router);
    if(!jwtService.isLoggedIn()){
        router.navigate(["/admin/login"]);
    }
    return true;
}
