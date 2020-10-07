import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
// import * as frmApp from '../../app.reducer';
import * as frmRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  isLoading$;
  // isLoading;
  loadingSubscription = new Subscription();
  constructor(private authService: AuthService, private uiService: UiService,
    //  private store: Store<{ ui: frmApp.State }>
    private store: Store<frmRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(frmRoot.getIsLoading);
    // this.isLoading$ = this.store.map(state => state.ui.isLoading)
    // this.store.subscribe(data => {
    //   console.log("Store data ", data.ui.isLoading);
    //   this.isLoading$ = data.ui.isLoading;
    // })

    // this.loadingSubscription = this.uiService.loadingChanged.subscribe(loadingStatus => {
    //   this.isLoading = loadingStatus;
    // })
  }

  onLogin(form: NgForm) {
    // console.log("ngForm ", form);
    this.authService.login({ email: form.value.email, password: form.value.password })
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
