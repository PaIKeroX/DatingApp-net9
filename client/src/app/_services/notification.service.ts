// src/app/_services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string) { //ต้องการ parameter 2 ตัวคือ message และ status แต่มีการเรียกใช้โดยส่งแค่ parameter เดียว ทำให้เกิด TypeScript error (เลยทำให้ parameter status เป็น optional )
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right', 
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}