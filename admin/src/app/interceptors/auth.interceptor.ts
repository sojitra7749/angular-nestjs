import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private encryptDecryptService: EncryptDecryptService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<void>> {
    if (this.encryptDecryptService.getDecryptedLocalStorage('token')) {
      const token = this.encryptDecryptService.getDecryptedLocalStorage('token');
      req = req.clone({
        setHeaders: {
          Authorization: token,
        }
      });
    }

    req = req.clone({
      url: environment.API_URL + req.url,
    });

    return next.handle(req);
  }
}
