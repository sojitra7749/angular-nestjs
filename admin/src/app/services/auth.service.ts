import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CryptoService } from '@services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/auth/login';

  constructor(
    private http: HttpClient,
    private cryptoService: CryptoService,
    private router: Router
  ) { }


  login(email: string, password: string) {
    return this.http.post<{ accessToken: string; }>(this.loginUrl, { email, password });
  }

  public isLoggedIn() {
    return this.cryptoService.getDecryptedStorage('token');
  }

  public logout() {
    this.router.navigate([this.loginUrl]);
    return this.cryptoService.removeEncryptedStorage('token');
  }
}
