import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FPwdComponent } from './auth/f-pwd/f-pwd.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { CropInfoFormComponent } from './analysis/crop-info-form/crop-info-form.component';
import { SchemesComponent } from './analysis/schemes/schemes.component';
import { HomeComponent } from './analysis/home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AnalysisPageComponent } from './analysis/analysis-page/analysis-page.component';
import { ChatBotComponent } from './analysis/chat-bot/chat-bot.component';
import { WeatherAlertsComponent } from './admin/weather-alerts/weather-alerts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'ForgotPassword',
    component: FPwdComponent
  },{
    path: 'SignUp',
    component: SignUpComponent
  }, 
  {
    path:'Crop-Details',
    component:CropInfoFormComponent
  },
  {
    path:'Schemes',
    component: SchemesComponent
  },
  {
    path:'Krushijantra-Home',
    component:HomeComponent
  },
  {
    path:'Profile',
    component:ProfileComponent
  }
  ,{path:'Analysis',component:AnalysisPageComponent}
  ,{path:'chatBot',component:ChatBotComponent}
  ,{path:'weather-alerts',component:WeatherAlertsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
