import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { STORAGE } from '@constants/storage.constant';
import { ILogin } from '@interfaces/login.interface';
import { AuthService } from '@services/auth.service';
import { CryptoService } from '@services/crypto.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [NgIf, NgClass, FormsModule]
})
export class LoginComponent implements OnInit {
  @ViewChild('frm') frm!: NgForm;
  loginForm: ILogin = {
    email: '',
    password: ''
  };
  remember = true;
  hide = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const loginInfo = this.cryptoService.getDecryptedStorage(STORAGE.REMEMBER_ME) as ILogin;
    if (loginInfo) {
      this.loginForm = loginInfo;
    }
  }

  /**
   * This function logs in a user by sending their email and password to the server, storing the access
   * token in encrypted local storage, and navigating to the dashboard page.
   * @param {NgForm} loginForm - The loginForm parameter is of type NgForm, which is a built-in Angular
   * class used to represent an HTML form and its controls. It is used to validate user input and track
   * the state of the form. In this code snippet, it is used to check if the form is valid before
   * attempting to
   * @returns If the `loginForm` is invalid, the function will return nothing (`undefined`). Otherwise,
   * it will call the `login` method of the `authService` and subscribe to the response. Once the
   * response is received, it will set the encrypted token in local storage and navigate to the
   * dashboard route. Finally, it will set `isLoading` to false.
   */
  login() {
    if (this.frm.invalid) { return; }

    if (this.remember) {
      this.cryptoService.setEncryptedStorage(STORAGE.REMEMBER_ME, this.loginForm);
    } else {
      this.cryptoService.removeEncryptedStorage(STORAGE.REMEMBER_ME);
    }

    this.isLoading = true;
    this.authService.login(this.loginForm.email, this.loginForm.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((res) => {
        this.cryptoService.setEncryptedStorage(STORAGE.LOGIN_TOKEN, res.accessToken);
        this.router.navigate(['/']).then(() => {
          this.toasterService.showToast('Login successfully!');
        });
      });
  }
}
