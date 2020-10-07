import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as frmRoot from "../../app.reducer";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter();
  authSubscription = new Subscription();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<frmRoot.State>) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authUpdate.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
    this.isAuth$ = this.store.select(frmRoot.getIsAuthorized);
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  logOut() {
    this.onSidenavClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


}
