import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropsServiceService {

  
  private apiUrl = "http://localhost:3000/api/crops";

  constructor(private http: HttpClient) {}

  addCrop(cropData: any): Observable<any> {
    return this.http.post(this.apiUrl, cropData, {
    headers: { 'Content-Type': 'application/json' }
  });
  }
}
