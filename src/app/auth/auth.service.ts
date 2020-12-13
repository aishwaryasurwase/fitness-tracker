import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';
// import * as frmApp from '../app.reducer';
import * as fromRoot from '../app.reducer';
import * as UI from "../shared/ui.action";
import * as Auth from "./auth.action";

import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  authUpdate = new Subject<boolean>();
  // isAuthenticated = false;
  isAuthenticated;

  constructor(private router: Router, private afauth: AngularFireAuth,
    private traningService: TrainingService, private snackbar: MatSnackBar, private uiService: UiService,
    // private store: Store<{ ui: frmApp.State }>
    private store: Store<fromRoot.State>
  ) { }

  initAuthListener() {
    this.afauth.authState.subscribe(user => {
      if (user) {
        // this.isAuthenticated = true;
        // this.authUpdate.next(true);
        this.store.dispatch(new Auth.AuthorizedUser());
        this.router.navigate(['/training']);
      } else {
        this.traningService.cancelSubscription();
        // this.router.navigate(['/login']);
        // this.authUpdate.next(false);
        // this.isAuthenticated = false;
        this.store.dispatch(new Auth.UnauthorizedUser());
      }
    })
  }

  registerUser(auth: AuthData) {
    this.uiService.loadingChanged.next(true);
    // this.store.dispatch({type: 'START_LOADING'});

    this.afauth.createUserWithEmailAndPassword(auth.email, auth.password).then((success) => {
      console.log("signup success", success);
      this.uiService.loadingChanged.next(false);
      // this.store.dispatch({type: 'STOP_LOADING'});

    }).catch((err) => {
      this.uiService.loadingChanged.next(false);
      // this.store.dispatch({type: 'STOP_LOADING'})
      // this.uiService.showSnackbar(err.messsage, null, 3000);
      this.snackbar.open(err.message, null, {
        duration: 3000
      })
    })
  }

  login(auth: AuthData) {
    // this.uiService.loadingChanged.next(true);
    // this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch(new UI.StartLoading());

    this.afauth.signInWithEmailAndPassword(auth.email, auth.password).then((success) => {
      console.log("login success", success);
      // this.uiService.loadingChanged.next(false);
      // this.store.dispatch({type: 'STOP_LOADING'});
      this.store.dispatch(new UI.StopLoading());

    }).catch((err) => {
      // console.log("error", err.message);
      // this.store.dispatch({type: "STOP_LOADING"});
      this.store.dispatch(new UI.StopLoading());

      // this.uiService.loadingChanged.next(false);
      this.snackbar.open(err.message, null, {
        duration: 3000
      })
      // this.uiService.showSnackbar(err.messsage, null, 3000);
    })
  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }

  logout() {
    this.afauth.signOut();
    this.router.navigate(['/login']);
  }
}
