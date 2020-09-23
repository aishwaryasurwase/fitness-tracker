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
// import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  authUpdate = new Subject<boolean>();
  isAuthenticated = false;

  constructor(private router: Router, private afauth: AngularFireAuth,
    private traningService: TrainingService, private snackbar: MatSnackBar, private uiService: UiService,
    // private store: Store<{ ui: frmApp.State }>
    ) { }

  initAuthListener() {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authUpdate.next(true);
        this.router.navigate(['/training']);
      } else {
        this.traningService.cancelSubscription();
        this.authUpdate.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
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
    this.uiService.loadingChanged.next(true);
    // this.store.dispatch({type: 'START_LOADING'});
    
    this.afauth.signInWithEmailAndPassword(auth.email, auth.password).then((success) => {
      console.log("login success", success);
      this.uiService.loadingChanged.next(false);
      // this.store.dispatch({type: 'STOP_LOADING'});

    }).catch((err) => {
      // console.log("error", err.message);
      // this.store.dispatch({type: "STOP_LOADING"});

      this.uiService.loadingChanged.next(false);
      this.snackbar.open(err.message, null, {
        duration: 3000
      })
      // this.uiService.showSnackbar(err.messsage, null, 3000);
    })
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.afauth.signOut();
  }
}
