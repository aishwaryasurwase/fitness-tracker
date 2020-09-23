import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();
  authChange = new Subscription();

  statusAuth;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authChange = this.authService.authUpdate.subscribe(authStatus => {
      this.statusAuth = authStatus;
    })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authChange) {
      this.authChange.unsubscribe();
    }
  }

}
