import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface AnalysisData {
  prediction_tonnes_per_ha: number;
  expected_revenue: number | null;
  optimal_yield_possible: number;
  optimal_revenue: number;
  revenue_increase: number;
  percent_increase_in_yield: number;
  best_crop_by_revenue: string;
  revenue_increase_from_best_crop_by_revenue: number;
  n_kg_ha_to_be_added: number;
  p_kg_ha_to_be_added: number;
  k_kg_ha_to_be_added: number;
  pH_recommended: number;
  fertilizer_value_recommended_kg_ha: number;
  pesticide_value_recommended_kg_ha: number;
  recommend_irrigation: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://localhost:5001'; // FastAPI URL

  constructor(private http: HttpClient) {}

  predict(data: any): Observable<AnalysisData> {
    return this.http.post<AnalysisData>(`${this.apiUrl}/predict`, data);
  }
  // prediction.service.ts
submitCropWithPrediction(cropData: any) {
  return this.http.post('http://localhost:5000/api/crops/submit', cropData);
}

}
