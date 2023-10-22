import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import { CryptoService } from '@app/services/crypto.service';
import { ToasterService } from '@app/services/toaster.service';
import { STORAGE } from '@constants/storage.constant';
import { StorageService } from '@services/storage.service';


export const HttpTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const cryptoService = inject(CryptoService);
  const token = cryptoService.getDecryptedStorage(STORAGE.LOGIN_TOKEN);

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};

export const HttpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const toasterService = inject(ToasterService);

  return next(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          storageService.clear();
          router.navigate(['/auth/login']);
        }

        if (error.error?.message) {
          toasterService.showToast(error.error.message, 'error');
        }

        const err = new HttpErrorResponse({
          error: error.error,
          statusText: error.message,
          status: error.status
        });
        throw err;
      })
    );
};
