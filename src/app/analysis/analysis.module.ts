import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropInfoFormComponent } from './crop-info-form/crop-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CropInfoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class AnalysisModule { }
