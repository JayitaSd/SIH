import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FPwdComponent } from './f-pwd/f-pwd.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    FPwdComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
