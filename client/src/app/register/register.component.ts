import { Component, inject, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '@app/_services/account.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '@app/_services/notification.service';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '@app/_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, TextInputComponent, DatePickerComponent],
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  maxDate = new Date();
  validationErrors: string[] | undefined;

  // model: any = {
  //   username: '',
  //   password: '',
  // };

  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
  
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value)
    this.registerForm.patchValue({dateOfBirth: dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/members') ,
      error: (error) => {
        console.log(error);
        this.validationErrors = error
      }
    });

    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (!username || !password) {
      if (!username && !password) {
        this.notificationService.error('Username and password are required');
      } else if (!username) {
        this.notificationService.error('Username is required');
      } else {
        this.notificationService.error('Password is required');
      }
    return;
  }

  if (password !== confirmPassword) {
    this.notificationService.error('Passwords do not match');
    return;
  }

  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
}