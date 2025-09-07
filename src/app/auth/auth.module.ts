// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FPwdComponent } from './f-pwd/f-pwd.component';
// import { LoginComponent } from './login/login.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// @NgModule({
//   declarations: [
//     FPwdComponent,
//     LoginComponent,
//     SignUpComponent
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule
//   ]
// })
// export class AuthModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FPwdComponent } from './f-pwd/f-pwd.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    FPwdComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FPwdComponent,
    LoginComponent,
    SignUpComponent
  ]
})
export class AuthModule {}
