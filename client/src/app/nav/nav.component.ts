import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '@app/_services/notification.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
    MatSnackBarModule,
    TitleCasePipe
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  
  model: any = {};
  dropdownConfig = {
    animate: true,
    isAnimated: true,
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        if (error.error === 'Invalid username') {
          this.notificationService.error('Invalid username');
        } else if (error.error === 'Invalid password') {
          this.notificationService.error('Invalid password');
        } else {
          this.notificationService.error('An error occurred during login');
        }
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}