import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CryptoService } from '../services/crypto.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cryptoService: CryptoService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<void>> {
    if (this.cryptoService.getDecryptedStorage('token')) {
      const token = this.cryptoService.getDecryptedStorage('token') as string;
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
