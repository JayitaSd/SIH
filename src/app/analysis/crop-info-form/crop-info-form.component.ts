import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CropsServiceService } from 'src/app/services/crops-service.service';

@Component({
  selector: 'app-crop-info-form',
  templateUrl: './crop-info-form.component.html',
  styleUrls: ['./crop-info-form.component.css']
})
export class CropInfoFormComponent {
  constructor(private cropsService:CropsServiceService){}
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
  area:new FormControl("",[Validators.required]),
  season:new FormControl("",[Validators.required]),
 fertilizerUse:new FormControl('',[Validators.required]),
 pesticideUse:new FormControl('',[Validators.required]),
 temp:new FormControl('',[Validators.required]),
 humidity:new FormControl('',[Validators.required]),
 n:new FormControl('',[Validators.required]),
 p:new FormControl('',[Validators.required]),
 k:new FormControl('',[Validators.required]),
 pH:new FormControl('',[Validators.required])

  
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

    const userData = {
      district: this.cropFormGroup.get('district')!.value,
      crop: this.cropFormGroup.get('crop')!.value,
      season: this.cropFormGroup.get('season')!.value,
      area: this.cropFormGroup.get('area')!.value,
      fertilizerUse: this.cropFormGroup.get('fertilizerUse')!.value,
      pesticideUse: this.cropFormGroup.get('pesticideUse')!.value,
      temp: this.cropFormGroup.get('temp')!.value,
      humidity: this.cropFormGroup.get('humidity')!.value,
      n: this.cropFormGroup.get('n')!.value,
      p: this.cropFormGroup.get('p')!.value,
      k: this.cropFormGroup.get('k')!.value,
      pH: this.cropFormGroup.get('pH')!.value
    };

    this.cropsService.addCrop(userData).subscribe({
      next: (res) => {
        alert('Crop data saved successfully');
        this.cropFormGroup.reset();
      },
      error: (err) => {
        alert('Error saving crop data');
        console.error(err);
      }
    });
  }
}  
