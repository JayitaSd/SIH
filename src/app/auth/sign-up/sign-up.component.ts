// // // // // import { Component } from '@angular/core';
// // // // // import { FormControl, FormGroup, Validators } from '@angular/forms';

// // // // // @Component({
// // // // //   selector: 'app-sign-up',
// // // // //   templateUrl: './sign-up.component.html',
// // // // //   styleUrls: ['./sign-up.component.css']
// // // // // })
// // // // // export class SignUpComponent {
// // // // //  usernameError:any=false;
  
// // // // // regFormGroup=new FormGroup({
// // // // //   email:new FormControl('',[Validators.required,Validators.email]),
// // // // //   phone:new FormControl('',[Validators.required]),
// // // // //   fullName:new FormControl('',[Validators.required]),
// // // // //   adminOrFarmer:new FormControl('Farmer',[Validators.required]),
// // // // //   password:new FormControl('',[Validators.required]),
// // // // //   confirmPassword:new FormControl('',[Validators.required]),

  
// // // // // })
// // // // // getFormControl(name:string){
// // // // //   return this.regFormGroup.get(name);
// // // // // }
// // // // // isFormControlError(name:string){
// // // // //   return this.getFormControl(name)?.errors?.['required'] && this.getFormControl(name)?.dirty
// // // // // }
// // // // // checkPassword()
// // // // // {
// // // // //   return this.getFormControl('password')?.value != this.getFormControl('confirmPassword')?.value
// // // // //   && this.getFormControl('password')?.dirty && this.getFormControl('confirmPassword')?.dirty &&
// // // // //   this.getFormControl('password')?.touched && this.getFormControl('confirmPassword')?.touched
// // // // // }
// // // // //  submitData(){
// // // // //     //  
// // // // //     if (this.regFormGroup.invalid || this.checkPassword()) {
// // // // //       alert('Please fill all fields correctly');
// // // // //       return;
// // // // //     }
  
// // // // // const userData = this.regFormGroup.value;

// // // // //     // ✅ Send data to backend using service
// // // // //     // this.registerService.registerUser(userData).subscribe({
// // // // //     //   next: (response) => {
// // // // //     //     console.log('User registered:', response);
// // // // //     //     alert('Registration successful!');
// // // // //     //     this.regFormGroup.reset();
// // // // //     //   },
// // // // //     //   error: (err) => {
// // // // //     //     console.error('Registration error:', err);
// // // // //     //     alert(err.error?.message || 'Registration failed!');
// // // // //     //   },
// // // // //     // });
// // // // //   }

// // // // //   subscribeToUserNameChanges() {
// // // // //     this.regFormGroup.get('fullName')?.valueChanges.subscribe((value: any) => {
// // // // //       // You can later add logic to check if username exists (by calling backend)
// // // // //       this.usernameError = false; // Placeholder for now
// // // // //     });
// // // // //   }
// // // // // }
// // // // import { Component } from '@angular/core';
// // // // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // // // import { RegisterService } from '../../services/register.service';
// // // // //path puchna hai eshika se doubt
// // // // @Component({
// // // //   selector: 'app-sign-up',
// // // //   templateUrl: './sign-up.component.html',
// // // //   styleUrls: ['./sign-up.component.css']
// // // // })
// // // // export class SignUpComponent {
// // // //   usernameError: any = false;

// // // //   constructor(private registerService: RegisterService) {}

// // // //   regFormGroup = new FormGroup({
// // // //     email: new FormControl('', [Validators.required, Validators.email]),
// // // //     phone: new FormControl('', [Validators.required]),
// // // //     fullName: new FormControl('', [Validators.required]),
// // // //     adminOrFarmer: new FormControl('Farmer', [Validators.required]),
// // // //     password: new FormControl('', [Validators.required]),
// // // //     confirmPassword: new FormControl('', [Validators.required]),
// // // //   });

// // // //   getFormControl(name: string) {
// // // //     return this.regFormGroup.get(name);
// // // //   }

// // // //   isFormControlError(name: string) {
// // // //     return (
// // // //       this.getFormControl(name)?.errors?.['required'] &&
// // // //       this.getFormControl(name)?.dirty
// // // //     );
// // // //   }

// // // //   checkPassword() {
// // // //     return (
// // // //       this.getFormControl('password')?.value !==
// // // //         this.getFormControl('confirmPassword')?.value &&
// // // //       this.getFormControl('password')?.dirty &&
// // // //       this.getFormControl('confirmPassword')?.dirty &&
// // // //       this.getFormControl('password')?.touched &&
// // // //       this.getFormControl('confirmPassword')?.touched
// // // //     );
// // // //   }

// // // //   submitData() {
// // // //     if (this.regFormGroup.invalid || this.checkPassword()) {
// // // //       alert('Please fill all fields correctly');
// // // //       return;
// // // //     }

// // // //     const userData = this.regFormGroup.value;

// // // //     this.registerService.registerUser(userData).subscribe({
// // // //       next: (response) => {
// // // //         console.log('User registered:', response);
// // // //         alert('Registration successful!');
// // // //         this.regFormGroup.reset();
// // // //       },
// // // //       error: (err:any) => {
// // // //         console.error('Registration error:', err);
// // // //         alert(err.error?.message || 'Registration failed!');
// // // //       },
// // // //     });
// // // //   }

// // // //   subscribeToUserNameChanges() {
// // // //     this.regFormGroup.get('fullName')?.valueChanges.subscribe((value: any) => {
// // // //       this.usernameError = false; // Later can add backend validation
// // // //     });
// // // //   }
// // // // }
// // // import { Component } from '@angular/core';
// // // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // // import { RegisterService } from '../../services/register.service';

// // // @Component({
// // //   selector: 'app-sign-up',
// // //   templateUrl: './sign-up.component.html',
// // //   styleUrls: ['./sign-up.component.css']
// // // })
// // // export class SignUpComponent {
// // //   usernameError: any = false;
// // //   otpSent: boolean = false;
// // //   phoneNumber: string = '';
// // //   otpCode: string = '';

// // //   constructor(private registerService: RegisterService) {}

// // //   regFormGroup = new FormGroup({
// // //     email: new FormControl('', [Validators.required, Validators.email]),
// // //     phone: new FormControl('', [Validators.required]),
// // //     fullName: new FormControl('', [Validators.required]),
// // //     adminOrFarmer: new FormControl('Farmer', [Validators.required]),
// // //     password: new FormControl('', [Validators.required]),
// // //     confirmPassword: new FormControl('', [Validators.required]),
// // //   });

// // //   getFormControl(name: string) {
// // //     return this.regFormGroup.get(name);
// // //   }

// // //   isFormControlError(name: string) {
// // //     return (
// // //       this.getFormControl(name)?.errors?.['required'] &&
// // //       this.getFormControl(name)?.dirty
// // //     );
// // //   }

// // //   checkPassword() {
// // //     return (
// // //       this.getFormControl('password')?.value !=
// // //         this.getFormControl('confirmPassword')?.value &&
// // //       this.getFormControl('password')?.dirty &&
// // //       this.getFormControl('confirmPassword')?.dirty
// // //     );
// // //   }

// // //   // Step 1: Send OTP
// // //   sendOtp() {
// // //     this.phoneNumber = this.getFormControl('phone')?.value || '';
// // //     this.registerService.sendOtp(this.phoneNumber).subscribe({
// // //       next: (res) => {
// // //         alert('OTP sent to your phone!');
// // //         this.otpSent = true;
// // //       },
// // //       error: (err) => {
// // //         console.error('OTP error:', err);
// // //         alert('Failed to send OTP');
// // //       }
// // //     });
// // //   }

// // //   // Step 2: Verify OTP
// // //   verifyOtp() {
// // //     this.registerService.verifyOtp(this.phoneNumber, this.otpCode).subscribe({
// // //       next: (res) => {
// // //         alert('OTP verified! Registering user...');
// // //         this.registerUser();
// // //       },
// // //       error: (err) => {
// // //         console.error('OTP verify error:', err);
// // //         alert('Invalid OTP');
// // //       }
// // //     });
// // //   }

// // //   // Step 3: Register user
// // //   registerUser() {
// // //     const userData = this.regFormGroup.value;
// // //     this.registerService.registerUser(userData).subscribe({
// // //       next: (response) => {
// // //         console.log('User registered:', response);
// // //         alert('Registration successful!');
// // //         this.regFormGroup.reset();
// // //         this.otpSent = false;
// // //       },
// // //       error: (err) => {
// // //         console.error('Registration error:', err);
// // //         alert('Registration failed!');
// // //       }
// // //     });
// // //   }
// // // }
// // import { Component } from '@angular/core';
// // import { FormControl, FormGroup, Validators } from '@angular/forms';
// // import { RegisterService } from '../../services/register.service';

// // @Component({
// //   selector: 'app-sign-up',
// //   templateUrl: './sign-up.component.html',
// //   styleUrls: ['./sign-up.component.css']
// // })
// // export class SignUpComponent {
// //   usernameError: any = false;
// //   otpSent: boolean = false;
// //   otpVerified: boolean = false;  // ✅ new flag
// //   phoneNumber: string = '';
// //   otpCode: string = '';

// //   constructor(private registerService: RegisterService) {}

// //   regFormGroup = new FormGroup({
// //     email: new FormControl('', [Validators.required, Validators.email]),
// //     phone: new FormControl('', [Validators.required]),
// //     fullName: new FormControl('', [Validators.required]),
// //     adminOrFarmer: new FormControl('Farmer', [Validators.required]),
// //     password: new FormControl('', [Validators.required]),
// //     confirmPassword: new FormControl('', [Validators.required]),
// //     otp: new FormControl('', [Validators.required])
// //   });

// //   getFormControl(name: string) {
// //     return this.regFormGroup.get(name);
// //   }

// //   isFormControlError(name: string) {
// //     return (
// //       this.getFormControl(name)?.errors?.['required'] &&
// //       this.getFormControl(name)?.dirty
// //     );
// //   }

// //   checkPassword() {
// //     return (
// //       this.getFormControl('password')?.value !==
// //         this.getFormControl('confirmPassword')?.value &&
// //       this.getFormControl('password')?.dirty &&
// //       this.getFormControl('confirmPassword')?.dirty
// //     );
// //   }

// //   // Step 1: Send OTP
// //   sendOtp() {
// //     this.phoneNumber = this.getFormControl('phone')?.value || '';
// //     this.registerService.sendOtp(this.phoneNumber).subscribe({
// //       next: () => {
// //         alert('OTP sent to your phone!');
// //         this.otpSent = true;
// //       },
// //       error: (err) => {
// //         console.error('OTP error:', err);
// //         alert('Failed to send OTP');
// //       }
// //     });
// //   }

// //   // Step 2: Verify OTP
// //   verifyOtp() {
// //     this.otpCode = this.getFormControl('otp')?.value || '';  
// //     this.registerService.verifyOtp(this.phoneNumber, this.otpCode).subscribe({
// //       next: () => {
// //         alert('OTP verified!');
// //         this.otpVerified = true;   // ✅ enable Register button
// //       },
// //       error: (err) => {
// //         console.error('OTP verify error:', err);
// //         alert('Invalid OTP');
// //       }
// //     });
// //   }

// //   // Step 3: Register user (only if OTP verified)
// //   registerUser() {
// //     if (!this.otpVerified) {
// //       alert('Please verify OTP before registering.');
// //       return;
// //     }

// //     const userData = this.regFormGroup.value;
// //     this.registerService.registerUser(userData).subscribe({
// //       next: (response) => {
// //         console.log('User registered:', response);
// //         alert('Registration successful!');
// //         this.regFormGroup.reset();
// //         this.otpSent = false;
// //         this.otpVerified = false;
// //       },
// //       error: (err) => {
// //         console.error('Registration error:', err);
// //         alert('Registration failed!');
// //       }
// //     });
// //   }
// // }
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { RegisterService } from '../../services/register.service';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent {
//   otpSent = false;
//   otpVerified = false;
//   phoneNumber = '';
//   otpCode = '';

//   constructor(private registerService: RegisterService) {}

//   regFormGroup = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     phone: new FormControl('', [Validators.required]),
//     fullName: new FormControl('', [Validators.required]),
//     adminOrFarmer: new FormControl('Farmer', [Validators.required]),
//     password: new FormControl('', [Validators.required]),
//     confirmPassword: new FormControl('', [Validators.required]),
//     otp: new FormControl('', [Validators.required]),
//   });

//   getFormControl(name: string) {
//     return this.regFormGroup.get(name);
//   }

//   checkPassword() {
//     return (
//       this.getFormControl('password')?.value !==
//       this.getFormControl('confirmPassword')?.value
//     );
//   }

//   // Step 1: Send OTP
//   sendOtp() {
//     this.phoneNumber = (this.getFormControl('phone')?.value || '').toString().trim();
//     this.registerService.sendOtp(this.phoneNumber).subscribe({
//       next: () => { this.otpSent = true; alert('OTP sent!'); },
//       error: () => alert('Failed to send OTP'),
//     });
//   }

//   // Step 2: Verify OTP
//   verifyOtp() {
//     this.phoneNumber = (this.getFormControl('phone')?.value || '').toString().trim();
//     this.otpCode = (this.getFormControl('otp')?.value || '').toString().trim();

//     this.registerService.verifyOtp(this.phoneNumber, this.otpCode).subscribe({
//       next: () => { this.otpVerified = true; alert('OTP verified!'); },
//       error: () => alert('Invalid OTP'),
//     });
//   }

//   // Step 3: Register user
//   registerUser() {
//     if (!this.otpVerified) {
//       alert('Please verify OTP before registering.');
//       return;
//     }
//     const userData = this.regFormGroup.value;
//     this.registerService.registerUser(userData).subscribe({
//       next: () => {
//         alert('Registration successful!');
//         this.regFormGroup.reset();
//         this.otpSent = false;
//         this.otpVerified = false;
//       },
//       error: () => alert('Registration failed!'),
//     });
//   }
// }
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  otpSent = false;
  otpVerified = false;
  phoneNumber = '';
  otpCode = '';

  // extra property for username check (if needed)
  usernameError: boolean = false;

  constructor(private registerService: RegisterService,private router:Router) {}

  regFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    adminOrFarmer: new FormControl('Farmer', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    otp: new FormControl('', [Validators.required]),
  });

  getFormControl(name: string) {
    return this.regFormGroup.get(name);
  }

  // check if a control is invalid and touched
  isFormControlError(controlName: string): boolean {
    const control = this.regFormGroup.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  checkPassword() {
    return (
      this.getFormControl('password')?.value !==
      this.getFormControl('confirmPassword')?.value
    );
  }

  // Step 1: Send OTP
  sendOtp() {
    this.phoneNumber = (this.getFormControl('phone')?.value || '').toString().trim();
    this.registerService.sendOtp(this.phoneNumber).subscribe({
      next: () => { this.otpSent = true; alert('OTP sent!'); },
      error: () => alert('Failed to send OTP'),
    });
  }

  // Step 2: Verify OTP
  verifyOtp() {
    this.phoneNumber = (this.getFormControl('phone')?.value || '').toString().trim();
    this.otpCode = (this.getFormControl('otp')?.value || '').toString().trim();

    this.registerService.verifyOtp(this.phoneNumber, this.otpCode).subscribe({
      next: () => { this.otpVerified = true; alert('OTP verified!'); },
      error: () => alert('Invalid OTP'),
    });
  }

  // Step 3: Register user
  registerUser() {
    if (!this.otpVerified) {
      alert('Please verify OTP before registering.');
      return;
    }
    const userData = this.regFormGroup.value;
    this.registerService.registerUser(userData).subscribe({
      next: () => {
        alert('Registration successful!');
        this.regFormGroup.reset();
        this.otpSent = false;
        this.otpVerified = false;
        this.router.navigate(['Login']);
      },
      error: () => alert('Registration failed!'),
    });
  }
}
