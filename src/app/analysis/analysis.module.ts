import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropInfoFormComponent } from './crop-info-form/crop-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { HomeComponent } from './home/home.component';
import { SchemesComponent } from './schemes/schemes.component';



@NgModule({
  declarations: [
    CropInfoFormComponent,
    AnalysisPageComponent,
    HomeComponent,
    SchemesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AnalysisModule { }
