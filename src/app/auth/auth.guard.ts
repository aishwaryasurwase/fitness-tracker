import { CanActivate, ActivatedRoute, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // throw new Error("Method not implemented.");
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate['login']
        }
    }

    // canActivate(route: ActivatedRoute):Observable<boolean> {
    //     if (this.authService.isAuth()) {
    //         return true;
    //     } else {
    //         this.router.navigate['/login']
    //     }
    // }
}