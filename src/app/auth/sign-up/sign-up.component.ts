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
  navigateToLogin() {
    this.router.navigate(['Login']);
  }
}