import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); // <-- token from login
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAdmins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admins`, this.getHeaders());
  }

  addAdmin(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-admin`, { phone }, this.getHeaders());
  }

  updateAdmin(id: string, newPhone: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admins/${id}`, { newPhone }, this.getHeaders());
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admins/${id}`, this.getHeaders());
  }
}
