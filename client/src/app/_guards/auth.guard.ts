import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { NotificationService } from '@app/_services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const notificationService = inject(NotificationService);

  if (accountService.currentUser()) {
    return true;
  } else {
    notificationService.error('Please login to access this page');
    return false;
  }
};
