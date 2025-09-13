import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CropInfoFormComponent } from './crop-info-form/crop-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { HomeComponent } from './home/home.component';
import { SchemesComponent } from './schemes/schemes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthModule } from '../auth/auth.module';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ReactHostComponent } from './react-host/react-host.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CropInfoFormComponent,
    AnalysisPageComponent,
    HomeComponent,
    SchemesComponent,
    NavbarComponent,
    ChatBotComponent,
    ReactHostComponent
  ],
  imports: [
    
    FormsModule,ReactiveFormsModule,
    AuthModule,CommonModule
    
  ]
  ,schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AnalysisModule { }
