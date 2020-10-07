import { CanActivate, ActivatedRoute, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as frmRoot from '../app.reducer';
import { take } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private store: Store<frmRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // throw new Error("Method not implemented.");
        // if (this.authService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate['login']
        // }
        return this.store.select(frmRoot.getIsAuthorized).pipe(take(1));
    }

    // canActivate(route: ActivatedRoute):Observable<boolean> {
    //     if (this.authService.isAuth()) {
    //         return true;
    //     } else {
    //         this.router.navigate['/login']
    //     }
    // }
}