import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropInfoFormComponent } from './crop-info-form/crop-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { HomeComponent } from './home/home.component';
import { SchemesComponent } from './schemes/schemes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    CropInfoFormComponent,
    AnalysisPageComponent,
    HomeComponent,
    SchemesComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    AuthModule
  ]
  
})
export class AnalysisModule { }
