import { Component } from '@angular/core';

@Component({
  selector: 'app-f-pwd',
  templateUrl: './f-pwd.component.html',
  styleUrls: ['./f-pwd.component.css']
})
export class FPwdComponent {
  // TypeScript code
   step: number = 1; // 1: email, 2: otp, 3: reset password
  message: string = '';
  messageClass: string = 'msg';

  email: string = '';
  otp: string = '';
  newPass: string = '';
  confirmPass: string = '';

  private generatedOTP: string = '1234'; // Demo OTP

  sendOTP(): void {
    if (!this.email.trim()) {
      alert('Please enter your email');
      return;
    }
    this.step = 2;
    this.message = `OTP has been sent to ${this.email}`;
    this.messageClass = 'msg';
  }

  verifyOTP(): void {
    if (this.otp.trim() === this.generatedOTP) {
      this.step = 3;
      this.message = 'OTP Verified. Enter your new password.';
      this.messageClass = 'msg';
    } else {
      this.message = 'Invalid OTP. Try again.';
      this.messageClass = 'error';
    }
  }

  resetPassword(): void {
    if (!this.newPass.trim() || !this.confirmPass.trim()) {
      alert('Please fill all fields');
      return;
    }

    if (this.newPass !== this.confirmPass) {
      this.message = 'Passwords do not match.';
      this.messageClass = 'error';
      return;
    }

    this.message = 'Password successfully reset!';
    this.messageClass = 'msg';
    this.step = 1; // Reset to initial step
    this.email = '';
    this.otp = '';
    this.newPass = '';
    this.confirmPass = '';
  }
}
