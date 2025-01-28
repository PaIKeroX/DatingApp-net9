import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '@app/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }
  constructor(private cdr: ChangeDetectorRef) {}

  registerToggle() {
    this.registerMode = !this.registerMode;
    console.log('Register Mode:', this.registerMode);
    this.cdr.detectChanges(); // บังคับให้ Angular อัปเดต UI
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    console.log('Cancel Register Mode:', this.registerMode);
    this.cdr.detectChanges(); // บังคับให้ Angular อัปเดต UI
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.error(error),
      complete: () => console.log('Request has completed'),
    });
  }
}