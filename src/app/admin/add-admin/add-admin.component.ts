import { Component } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
 newAdminPhone: string = '';
  admins: string[] = ['+919503742187'];

  editIndex: number | null = null;
  editedPhone: string = '';

  addAdmin() {
    if (this.newAdminPhone && /^[0-9]{10}$/.test(this.newAdminPhone)) {
      if (!this.admins.includes(this.newAdminPhone)) {
        this.admins.push(this.newAdminPhone);
        this.newAdminPhone = '';
      } else {
        alert("This number is already an admin.");
      }
    } else {
      alert("Enter a valid 10-digit phone number.");
    }
  }

  deleteAdmin(index: number) {
    if (confirm("Are you sure you want to delete this admin?")) {
      this.admins.splice(index, 1);
    }
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editedPhone = this.admins[index];
  }

  saveEdit(index: number) {
    if (!/^[0-9]{10}$/.test(this.editedPhone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    if (confirm("Do you want to update this admin number?")) {
      this.admins[index] = this.editedPhone;
    }

    this.editIndex = null;
    this.editedPhone = '';
  }
}
