// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegisterService {
//   private apiUrl = 'http://localhost:3000/api';

//   constructor(private http: HttpClient) {}

//   sendOtp(phone: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/send-otp`, { phone });
//   }

//   verifyOtp(phone: string, otp: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/verify-otp`, { phone, otp });
//   }

//   registerUser(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   // ✅ New login method
//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }
// //   forgotVerifyOtp(phone: string, otp: string): Observable<any> {
// //   return this.http.post(`${this.apiUrl}/forgot-verify-otp`, { phone, otp });
// // }

// resetPassword(phone: string, newPassword: string): Observable<any> {
//   return this.http.post(`${this.apiUrl}/reset-password`, { phone, newPassword});
// }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  sendOtp(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { phone });
  }

  verifyOtp(phone: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { phone, otp });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  resetPassword(phone: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { phone, newPassword });
  }
}
