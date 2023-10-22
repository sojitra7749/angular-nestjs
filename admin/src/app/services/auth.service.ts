import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { API } from '@constants/api.constant';
import { STORAGE } from '@constants/storage.constant';
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
    return this.http.post<{ accessToken: string; }>(API.LOGIN, { email, password });
  }

  public isLoggedIn() {
    return this.cryptoService.getDecryptedStorage(STORAGE.LOGIN_TOKEN);
  }

  public logout() {
    this.router.navigate([this.loginUrl]);
    return this.cryptoService.removeEncryptedStorage(STORAGE.LOGIN_TOKEN);
  }
}
