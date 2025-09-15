import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

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
   user: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        console.log('Profile fetched:', res);
        this.user = res.farmer; // your backend returns { success: true, farmer }
      },
      error: (err) => {
        console.error('Profile fetch error:', err);
        alert(err.error?.error || 'Failed to load profile');
      }
    });
  }

}