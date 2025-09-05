import { Component, OnInit } from '@angular/core';

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
  user: User | null = null;

  ngOnInit(): void {
    // 🔹 Temporary mock data until backend is ready
    this.user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+91-9876543210',
      role: 'Admin'
    };
  }

  editUser() {
    alert('Edit user clicked!');
  }
}
