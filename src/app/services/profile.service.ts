import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface User {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

   private apiUrl = 'http://localhost:3000/api'; // change if needed

  constructor(private http: HttpClient) { }

  // Get user profile
   getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // make sure you store only token, not object
    if (!token) {
      throw new Error('No token found. User might not be logged in.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }


  // Update user profile
  updateProfile(token: string, data: { email?: string, fullName?: string }): Observable<{ success: boolean, farmer: User }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<{ success: boolean, farmer: User }>(
      `${this.apiUrl}/profile`,
      data,
      { headers }
    );
  }
}
