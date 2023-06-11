import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95)'
        }),
        animate('100ms ease-out', style({
          opacity: 1,
          transform: 'scale(1)'
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate('75ms ease-in', style({
          opacity: 0,
          transform: 'scale(0.95)'
        }))
      ])
    ])
  ]
})
export class DashboardComponent {
  isMenuOpen = false;
  
  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }
}
