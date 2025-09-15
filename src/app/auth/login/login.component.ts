// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RegisterService } from '../../services/register.service'; 

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   inValidCredentials = false;
// isLoggedIn=false;
//   constructor(
//     private router: Router,
//     private registerService: RegisterService
//   ) {}

//   // ✅ yaha phone use karo
//   loginForm = new FormGroup({
//     phone: new FormControl('', [Validators.required]),
//     password: new FormControl('', [Validators.required]),
//   });

//   getFormControl(name: string) {
//     return this.loginForm.get(name);
//   }

//   submitForm() {
//     console.log('Login button clicked! ✅');
//     console.log('Form Data:', this.loginForm.value);

//     if (this.loginForm.invalid) {
//       this.inValidCredentials = true;
//       return;
//     }

//     // ✅ Call login API from service
//     this.registerService.login(this.loginForm.value).subscribe({
//       next: (res: any) => {
//         console.log('Login successful:', res);

//         // Example: save user info in localStorage
//         localStorage.setItem('user', JSON.stringify(res.farmer.fullName));
//         localStorage.setItem('token',JSON.stringify(res.token));
//         this.inValidCredentials = false;
//         localStorage.setItem('isLoggedIn',JSON.stringify(this.isLoggedIn));
//         this.router.navigate(['/Krushijantra-Home']); 
//       },
//       error: (err: any) => {
//         console.error('Login failed:', err);
//         this.inValidCredentials = true;
//       },
//     });
//   }
// isEmailRequired(name: string) {
//     return (
//       this.loginForm.get(name)?.touched &&
//       this.loginForm.get(name)?.errors?.['required']
//     );
//   }
//   navigateToForgotPW() {
//     this.router.navigate(['ForgotPassword']);
//   }
//   navigateToRegister(){
//     this.router.navigate(['SignUp']);
//   }
// }
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inValidCredentials = false;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

  // ✅ Only phone & password
  loginForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  getFormControl(name: string) {
    return this.loginForm.get(name);
  }

  // ✅ Generic required field check (works for phone & password)
  isFieldRequired(name: string) {
    return (
      this.loginForm.get(name)?.touched &&
      this.loginForm.get(name)?.errors?.['required']
    );
  }

  submitForm() {
    if (this.loginForm.invalid) {
      this.inValidCredentials = true;
      return;
    }

    this.registerService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log("Login response:", res);
        console.log('Login successful:', res);
        console.log('Logged in user role:', res.farmer?.role);

        localStorage.setItem('user', JSON.stringify(res.farmer));
        localStorage.setItem('token', res.token);

        this.inValidCredentials = false;
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));

        this.router.navigate(['/Krushijantra-Home']);
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.inValidCredentials = true;
      },
    });
  }

  navigateToForgotPW() {
    this.router.navigate(['ForgotPassword']);
  }

  navigateToRegister() {
    this.router.navigate(['SignUp']);
  }
}