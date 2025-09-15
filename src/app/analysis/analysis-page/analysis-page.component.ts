import { Component } from '@angular/core';
import { PredictionService } from 'src/app/services/prediction.service';
interface AnalysisData {
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
@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrls: ['./analysis-page.component.css']
})
export class AnalysisPageComponent {

  // data: AnalysisData = { prediction_tonnes_per_ha: 1.83915, expected_revenue: 39593280, optimal_yield_possible: 2.05059, optimal_revenue: 44145102, revenue_increase: 4551822, percent_increase_in_yield: 11.5, best_crop_by_revenue: "rice", revenue_increase_from_best_crop_by_revenue: 0, n_kg_ha_to_be_added: 0, p_kg_ha_to_be_added: 19.67, k_kg_ha_to_be_added: 26.84, pH_recommended: 6.3, fertilizer_value_recommended_kg_ha: 241.3, pesticide_value_recommended_kg_ha: 2.1, recommend_irrigation: "Sprinkler, Moderate (every 3-6 days)" };

  // exportReport() {
  //   const payload = { generatedAt: new Date().toISOString(), data: this.data };
  //   const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a'); a.href = url;
  //   a.download = `analysis-report-${new Date().toISOString()}.json`;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  // downloadCSV() {
  //   const d = this.data as any;
  //   const rows = [['metric', 'value'], ['prediction_tonnes_per_ha', d.prediction_tonnes_per_ha], ['expected_revenue', d.expected_revenue], ['optimal_yield_possible', d.optimal_yield_possible], ['optimal_revenue', d.optimal_revenue], ['revenue_increase', d.revenue_increase], ['percent_increase_in_yield', d.percent_increase_in_yield], ['best_crop_by_revenue', d.best_crop_by_revenue], ['revenue_increase_from_best_crop_by_revenue', d.revenue_increase_from_best_crop_by_revenue], ['n_kg_ha_to_be_added', d.n_kg_ha_to_be_added], ['p_kg_ha_to_be_added', d.p_kg_ha_to_be_added], ['k_kg_ha_to_be_added', d.k_kg_ha_to_be_added], ['pH_recommended', d.pH_recommended], ['fertilizer_value_recommended_kg_ha', d.fertilizer_value_recommended_kg_ha], ['pesticide_value_recommended_kg_ha', d.pesticide_value_recommended_kg_ha], ['recommend_irrigation', d.recommend_irrigation]];


  //   const csv = rows.map(r => r.join(',')).join('\n');
  //   const blob = new Blob([csv], { type: 'text/csv' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `analysis-${new Date().toISOString()}.csv`;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  
  data?: AnalysisData ; 
  loading = false;
  errorMsg = '';

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    // ✅ fetch data dynamically (you can pass stored form data here)
    const lastUserInput =JSON.parse(localStorage.getItem('lastCropData') || '{}');

    if (Object.keys(lastUserInput).length) {
      this.getPrediction(lastUserInput);
    }
  }

  getPrediction(userData: any) {
    this.loading = true;
    this.errorMsg = '';

    this.predictionService.predict(userData).subscribe({
      next: (res: AnalysisData) => {
        this.data = res;
         this.data.prediction_tonnes_per_ha*=1.5
        this.loading = false;
        console.log(this.data);
      },
      error: (err) => {
        this.errorMsg = 'Error fetching prediction';
        console.error(err);
        this.loading = false;
      }
    });
  }

  exportReport() {
    if (!this.data) return;

    const payload = { generatedAt: new Date().toISOString(), data: this.data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `analysis-report-${new Date().toISOString()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  downloadCSV() {
    if (!this.data) return;

    const d = this.data as any;
    const rows = Object.entries(d); // dynamically create rows from data
    const csv = rows.map(r => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

