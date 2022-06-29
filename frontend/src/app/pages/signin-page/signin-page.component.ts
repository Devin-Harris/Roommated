import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
})
export class SignInPageComponent {

  password = ""
  email = ""

  handleEmailChange(e: any){
    this.email = e.target.value;
  }

  handlePasswordChange(e: any){
    this.password = e.target.value;
  }

  signIn(){
    
  }
}
