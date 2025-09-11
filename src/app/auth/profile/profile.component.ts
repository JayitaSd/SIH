import { Component, Input, OnInit } from '@angular/core';

interface User {
  name: string;
  email: string;
  phone: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: any;
  userDetails:any;
  loggedInUser:any=localStorage.getItem('loggedInFarmerOrAdmin');
  // if(loggedInUser)

  ngOnInit(): void {
   
  }

  editUser() {
    alert('Edit user clicked!');
  }
  

}