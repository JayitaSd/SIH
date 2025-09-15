import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

 
 user?:any;
 isFarmerLoggedIn?:boolean;
constructor(private router:Router,private profileService:ProfileService){}
navigateToPage(page:string){
  this.router.navigate([page]);
}
ngOnInit(){
  this.user=this.profileService.getProfile().subscribe({
      next: (res:any) => {
        if (res.success) {
          this.user = res.user;
          // this.crops = res.crops;
          console.log('Profile loaded at navbar:', this.user);
          console.log(this.user.role)
           if(this.user.role && this.user.role=="admin"){
    console.log(this.user.role=='admin')
    this.isFarmerLoggedIn=false;
  }
  else{
    this.isFarmerLoggedIn=true;
  }
        }
      },
      error: (err:any) => console.error('Profile fetch error:', err),
    });

 
}

}
