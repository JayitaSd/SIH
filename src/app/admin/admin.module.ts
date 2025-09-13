import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherAlertsComponent } from './weather-alerts/weather-alerts.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WeatherAlertsComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
