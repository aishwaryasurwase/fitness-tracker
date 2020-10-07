import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as frmRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();
  authChange = new Subscription();

  statusAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<frmRoot.State>) { }

  ngOnInit(): void {
    // this.authChange = this.authService.authUpdate.subscribe(authStatus => {
    //   this.statusAuth = authStatus;
    // })
    this.statusAuth$ = this.store.select(frmRoot.getIsAuthorized);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // if (this.authChange) {
    //   this.authChange.unsubscribe();
    // }
  }

}
