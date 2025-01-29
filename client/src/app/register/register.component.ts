import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '@app/_services/account.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '@app/_services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private notificationService = inject(NotificationService);
  cancelRegister = output<boolean>();

  model: any = {
    username: '',
    password: '',
  };

  register() {
    if (!this.model.username || !this.model.password) {
      if (!this.model.username && !this.model.password) {
        this.notificationService.error('Username and password are required');
      } else if (!this.model.username) {
        this.notificationService.error('Username is required');
      } else {
        this.notificationService.error('Password is required');
      }
      return;
    }

    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => {
        this.notificationService.error(error.error || 'Registration failed');
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}