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
    return this.http.post(`${this.apiUrl}/crops`, cropData);
  }

  // Get prediction from Python ML API (through Node backend)
  getPrediction(cropData: any): Observable<any> {
    const body = {
  district: cropData.district,
  crop: cropData.crop,
  season: cropData.season,
  area: cropData.area,
  fertilizer_use: cropData.fertilizerUse, 
  pesticide_use: cropData.pesticideUse,
  temp: cropData.temp,
  humidity: cropData.humidity,
  n: cropData.n,
  p: cropData.p,
  k: cropData.k,
  ph: cropData.pH // map pH to ph
};
    return this.http.post(`${this.apiUrl}/predict`, body);
  }
}
