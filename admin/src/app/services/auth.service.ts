import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/auth/login';

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService, private router: Router) { }


  login(email: string, password: string) {
    return this.http.post<{ accessToken: string }>(this.loginUrl, { email, password });
  }

  public isLoggedIn() {
    return this.encryptDecryptService.getDecryptedLocalStorage('token');
  }

  public logout() {
    this.router.navigate(['/auth']);
    return this.encryptDecryptService.removeEncryptedLocalStorage('token');
  }
}
