import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crop-info-form',
  templateUrl: './crop-info-form.component.html',
  styleUrls: ['./crop-info-form.component.css']
})
export class CropInfoFormComponent {
soilTypes=[]
irrigationTypes=[]
cropFormGroup=new FormGroup({
  location:new FormControl('',[Validators.required]),
  soilType:new FormControl('',[Validators.required]),
  irrigationType:new FormControl('',[Validators.required]),
  yield:new FormControl('',[Validators.required]),
  fertilizers:new FormControl('',[Validators.required]),

  
})
getFormControl(name:string){
  return this.cropFormGroup.get(name);
}
isFormControlError(name:string){
  return this.getFormControl(name)?.errors?.['required'] && this.getFormControl(name)?.dirty
}

 submitData(){
     
    if (this.cropFormGroup.invalid ) {
      alert('Please fill all fields correctly');
      return;
    }
  
const userData = this.cropFormGroup.value;  }

  
}