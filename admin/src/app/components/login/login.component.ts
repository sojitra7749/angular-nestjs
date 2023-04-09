import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class LoginComponent {
  email!: string;
  password!: string;
  hide = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private encryptDecryptService: EncryptDecryptService,
    private router: Router
  ) { }

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
  login(loginForm: NgForm) {
    if (loginForm.invalid) { return; }
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe((res) => {
      this.encryptDecryptService.setEncryptedLocalStorage('token', res.accessToken);
      this.router.navigate(['dashboard']);
      this.isLoading = false;
    });
  }
}
