import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  newAdminPhone: string = '';
  admins: any[] = [];
  editIndex: number | null = null;
  editedPhone: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins(); // Load admins from DB when component loads
  }

  // loadAdmins() {
  //   this.adminService.getAdmins().subscribe({
  //     next: (data: any) => {
  //       this.admins = data;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load admins', err);
  //     }
  //   });
  // }
//   loadAdmins() {
//   this.adminService.getAdmins().subscribe({
//     next: (data: any) => {
//       this.admins = data;

//       // Check if default admin exists
//   //     const defaultPhone = '+919503742187';
//   //     const exists = this.admins.some((a: any) => a.phone === defaultPhone);
//   //     if (!exists) {
//   //       // Add default admin to DB
//   //       this.adminService.addAdmin(defaultPhone).subscribe({
//   //         next: () => this.loadAdmins(), // reload after adding
//   //         error: (err) => console.error('Failed to add default admin', err)
//   //       });
//   //     }
//   //   },
//   //   error: (err) => {
//   //     console.error('Failed to load admins', err);
//   //   }
//   // });
// }
loadAdmins() {
  this.adminService.getAdmins().subscribe({
    next: (data: any) => {
      this.admins = data;
      console.log('Admins loaded:', this.admins); // directly use DB data
    },
    error: (err:any) => {
      console.error('Failed to load admins', err);
    }
  });
}

  addAdmin() {
    const phone = this.newAdminPhone.trim();
    if (phone !== '' && phone.length === 10) {
      const formatted = '+91' + phone;

      this.adminService.addAdmin(formatted).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loadAdmins(); // reload admins from DB
          this.newAdminPhone = '';
        },
        error: (err:any) => {
          console.error(err);
          alert('Failed to add admin');
        }
      });
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  }

  startEdit(index: number) {
    this.editIndex = index;
    const phone = this.admins[index].phone || this.admins[index]; // handle object vs string
    this.editedPhone = phone.startsWith('+91') ? phone.substring(3) : phone;
  }

  saveEdit(index: number) {
    const phone = this.editedPhone.trim();
    if (phone !== '' && phone.length === 10) {
      const formatted = '+91' + phone;
      const id = this.admins[index]._id; // MongoDB ID

      this.adminService.updateAdmin(id, formatted).subscribe({
        next: () => {
          alert('Admin updated');
          this.loadAdmins();
          this.editIndex = null;
        },
        error: (err:any) => {
          console.error(err);
          alert('Failed to update admin');
        }
      });
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  }

  deleteAdmin(index: number) {
    const id = this.admins[index]._id;
    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        alert('Admin deleted');
        this.loadAdmins();
      },
      error: (err:any) => {
        console.error(err);
        alert('Failed to delete admin');
      }
    });
  }
}
