import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackbar: MatSnackBar) { }
  loadingChanged = new Subject<boolean>();

  showSnackbar(message, action, duration){
    console.log(message,"message");
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
