import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
 usernameError:any=false;
  
regFormGroup=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  phone:new FormControl('',[Validators.required]),
  fullName:new FormControl('',[Validators.required]),
  adminOrFarmer:new FormControl('Farmer',[Validators.required]),
  password:new FormControl('',[Validators.required]),
  confirmPassword:new FormControl('',[Validators.required]),

  
})
getFormControl(name:string){
  return this.regFormGroup.get(name);
}
isFormControlError(name:string){
  return this.getFormControl(name)?.errors?.['required'] && this.getFormControl(name)?.dirty
}
checkPassword()
{
  return this.getFormControl('password')?.value != this.getFormControl('confirmPassword')?.value
  && this.getFormControl('password')?.dirty && this.getFormControl('confirmPassword')?.dirty &&
  this.getFormControl('password')?.touched && this.getFormControl('confirmPassword')?.touched
}
 submitData(){
     
    if (this.regFormGroup.invalid || this.checkPassword()) {
      alert('Please fill all fields correctly');
      return;
    }
  
const userData = this.regFormGroup.value;

    // ✅ Send data to backend using service
    // this.registerService.registerUser(userData).subscribe({
    //   next: (response) => {
    //     console.log('User registered:', response);
    //     alert('Registration successful!');
    //     this.regFormGroup.reset();
    //   },
    //   error: (err) => {
    //     console.error('Registration error:', err);
    //     alert(err.error?.message || 'Registration failed!');
    //   },
    // });
  }

  subscribeToUserNameChanges() {
    this.regFormGroup.get('fullName')?.valueChanges.subscribe((value: any) => {
      // You can later add logic to check if username exists (by calling backend)
      this.usernameError = false; // Placeholder for now
    });
  }
}
