import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { openClose } from '@animations/open-close.animations';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  animations: [openClose]
})
export class HeaderComponent {
  isUMenuOpen = false;
  isMMenuOpen = false;

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }
}
