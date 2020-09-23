import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  formValidate: boolean = true;
  isLoading;
  loadingSubscription = new Subscription();


  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubscription = this.uiService.loadingChanged.subscribe(loadingStatus=>{
      this.isLoading = loadingStatus;
    })
  }

  onSubmitForm(form) {
    // console.log("form ", form);
    console.log("Email ", form.value.email);
    console.log("Password ", form.value.password);

    this.authService.registerUser({ email: form.value.email, password: form.value.password })
    // if(form.valid){
    //   this.formValidate = false;
    // }
  }
  
  ngOnDestroy(){
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
  }
}
