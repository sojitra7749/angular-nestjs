import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/auth/login';

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService) { }


  login(email: string, password: string) {
    return this.http.post<{
      accessToken: string
    }>(this.loginUrl, { email, password }).subscribe(
      (res) => this.encryptDecryptService.setEncryptedLocalStorage('token', res.accessToken)
    );
  }

  public isLoggedIn() {
    return this.encryptDecryptService.getDecryptedLocalStorage('token');
  }

  public logout() {
    return this.encryptDecryptService.removeEncryptedLocalStorage('token');
    // Redirect to login page
  }
}
