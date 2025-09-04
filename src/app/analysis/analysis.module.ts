import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropInfoFormComponent } from './crop-info-form/crop-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';



@NgModule({
  declarations: [
    CropInfoFormComponent,
    AnalysisPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AnalysisModule { }
