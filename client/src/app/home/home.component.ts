import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component} from '@angular/core';
import { RegisterComponent } from '@app/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  registerMode = false;

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
}