import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inValidCredentials = false;
  
  constructor(private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getFormControl(name: string) {
    return this.loginForm.get(name);
  }

  isFormControlError(name: string) {
    return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.dirty;
  }

  isEmailValid(name: string) {
    return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.touched;
  }

  isEmailRequired(name: string) {
    return (
      this.loginForm.get(name)?.touched &&
      this.loginForm.get(name)?.errors?.['required']
    );
  }

  submitForm() {
    console.log('Login button clicked! ✅');
    console.log('Form Data:', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.inValidCredentials = true;
      return;
    }
    localStorage.setItem('loggedInFarmerOrAdmin',JSON.stringify(this.getFormControl('email')));
    
  }

  navigateToForgotPW() {
    this.router.navigate(['ForgotPassword']);
  }

  navigateToSignUp(){
    this.router.navigate(['SignUp']);
  }


}