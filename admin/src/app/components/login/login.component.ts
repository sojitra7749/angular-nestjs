import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
  ]
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password);
  }
}
