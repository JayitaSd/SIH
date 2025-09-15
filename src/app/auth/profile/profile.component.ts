import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  crops: any[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (res:any) => {
        if (res.success) {
          this.user = res.user;
          // this.crops = res.crops;
          console.log('Profile loaded:', this.user, 'Crops:', this.crops);
        }
      },
      error: (err:any) => console.error('Profile fetch error:', err),
    });
  }
}