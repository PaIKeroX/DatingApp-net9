import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationService } from '@app/_services/notification.service';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modalStateError = [];
              for (const key in error.error.errors) {
                if(error.error.errors[key]) {
                  modalStateError.push(error.error.errors[key])
                }
              }
              throw modalStateError.flat();
            } else {
              notification.error(error.error, error.status);
            }
            break;
          case 401:
            notification.error('Unauthorized', error.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            let errorMessage = 'A bad thing has happened';
            if (typeof error.error === 'string') {
              errorMessage = error.error;
            } else if (error.error?.message && typeof error.error.message === 'string') {
              errorMessage = error.error.message;
            }

            const navigationExtras: NavigationExtras = {
              state: {
                error: {
                  message: errorMessage,
                  details: JSON.stringify(error.error, null, 2)
                }
              }
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            notification.error('Something unexpected went wrong', error.status);
            break;
        }
      }
      throw error;
    })
  );
};