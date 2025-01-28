import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms'; // เพิ่มบรรทัดนี้

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // จำเป็นสำหรับ ngModel
    BsDropdownModule, // เปลี่ยนเป็น .forRoot()
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  accountService = inject(AccountService);
  model: any = {};
  dropdownConfig = {
    animate: true,
    isAnimated: true,
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
