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
districts=["Angul",
"Balangir",
"Balasore",
"Bargarh",
"Bhadrak",
"Boudh",
"Cuttack",
"Debagarh",
"Dhenkanal",
"Gajapati",
"Ganjam",
"Jagatsinghpur",
"Jajpur",
"Jharsuguda",
"Kalahandi",
"Kandhamal",
"Kendrapara",
"Kendujhar",
"Khordha",
"Koraput",
"Malkangiri",
"Mayurbhanj",
"Nabarangpur",
"Nayagarh",
"Nuapada",
"Puri",
"Rayagada",
"Sambalpur",
"Subarnapur" ,
"Sundargarh"]
crops=["Rice","Maize","Wheat","Millet","Black gram","Green gram","Pigeon pea","Horse gram","Chick pea","lentils","Field pea","Groundnut","Mustard","Sesamum","Niger","Castor and Linseed","Soybean","Sunflower","Oil palm","Jute and Mesta","Sugarcane","Cotton","Cashew","Coconut","Rubber","Coffee/Tea","Fruits","Spices","Sweet Potato","Mushroom"]
seasons=["Kharif","Rabi","Summer","Autumn","Whole year","Winter"]
cropFormGroup=new FormGroup({
  district:new FormControl('',[Validators.required]),
  crop:new FormControl('',[Validators.required]),
  sownArea:new FormControl("",[Validators.required]),
  season:new FormControl("",[Validators.required]),
 fertilizerUse:new FormControl('',[Validators.required]),
 pesticideUse:new FormControl('',[Validators.required]),
 avgTemperature:new FormControl('',[Validators.required]),
 avgHumidity:new FormControl('',[Validators.required]),
 soilN:new FormControl('',[Validators.required]),
 soilP:new FormControl('',[Validators.required]),
 soilK:new FormControl('',[Validators.required]),
 soilPH:new FormControl('',[Validators.required])

  
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