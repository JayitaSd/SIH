import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FPwdComponent } from './auth/f-pwd/f-pwd.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { CropInfoFormComponent } from './analysis/crop-info-form/crop-info-form.component';
import { SchemesComponent } from './analysis/schemes/schemes.component';
import { HomeComponent } from './analysis/home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';

const routes: Routes = [
  {
    path: '',
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
    path:'Krushiyantra-Home',
    component:HomeComponent
  },
  {
    path:'Profile',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
