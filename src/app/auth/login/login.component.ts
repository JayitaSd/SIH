// // import { Component } from '@angular/core';
// // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // import { Router } from '@angular/router'; 


// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css'],
// // })
// // export class LoginComponent {
// //   inValidCredentials = false;

// //   constructor(private router: Router) {}

// //   loginForm = new FormGroup({
// //     email: new FormControl('', [Validators.required, Validators.email]),
// //     password: new FormControl('', [Validators.required]),
// //   });

// //   getFormControl(name: string) {
// //     return this.loginForm.get(name);
// //   }

// //   isFormControlError(name: string) {
// //     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.dirty;
// //   }

// //   isEmailValid(name: string) {
// //     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.touched;
// //   }

// //   isEmailRequired(name: string) {
// //     return (
// //       this.loginForm.get(name)?.touched &&
// //       this.loginForm.get(name)?.errors?.['required']
// //     );
// //   }

// //   submitForm() {
// //     console.log('Login button clicked! ✅');
// //     console.log('Form Data:', this.loginForm.value);

// //     if (this.loginForm.invalid) {
// //       this.inValidCredentials = true;
// //       return;
// //     }

    
// //   }

// //   navigateToForgotPW() {
// //     this.router.navigate(['ForgotPassword']);
// //   }
// // }
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RegisterService } from '../../services/register.service'; // service import karo

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   inValidCredentials = false;

//   constructor(
//     private router: Router,
//     private registerService: RegisterService // inject service
//   ) {}

//   loginForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required]),
//   });

//   getFormControl(name: string) {
//     return this.loginForm.get(name);
//   }

//   isFormControlError(name: string) {
//     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.dirty;
//   }

//   isEmailValid(name: string) {
//     return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.touched;
//   }

//   isEmailRequired(name: string) {
//     return (
//       this.loginForm.get(name)?.touched &&
//       this.loginForm.get(name)?.errors?.['required']
//     );
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
//       next: (res:any) => {
//         console.log('Login successful:', res);

//         // Example: save user info in localStorage
//         localStorage.setItem('user', JSON.stringify(res.user));

//         this.inValidCredentials = false;
//         this.router.navigate(['/dashboard']); // dashboard ya home page pe le jao
//       },
//       error: (err:any) => {
//         console.error('Login failed:', err);
//         this.inValidCredentials = true;
//       },
//     });
//   }

//   navigateToForgotPW() {
//     this.router.navigate(['ForgotPassword']);
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
isLoggedIn=false;
  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

  // ✅ yaha phone use karo
  loginForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  getFormControl(name: string) {
    return this.loginForm.get(name);
  }

  submitForm() {
    console.log('Login button clicked! ✅');
    console.log('Form Data:', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.inValidCredentials = true;
      return;
    }

    // ✅ Call login API from service
    this.registerService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login successful:', res);

        // Example: save user info in localStorage
        localStorage.setItem('user', JSON.stringify(res.farmer.fullName));

        this.inValidCredentials = false;
        localStorage.setItem('isLoggedIn',JSON.stringify(this.isLoggedIn));
        this.router.navigate(['/Krushijantra-Home']); 
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.inValidCredentials = true;
      },
    });
  }
isEmailRequired(name: string) {
    return (
      this.loginForm.get(name)?.touched &&
      this.loginForm.get(name)?.errors?.['required']
    );
  }
  navigateToForgotPW() {
    this.router.navigate(['ForgotPassword']);
  }
  navigateToSignUp(){
    this.router.navigate(['SignUp']);
  }
}
