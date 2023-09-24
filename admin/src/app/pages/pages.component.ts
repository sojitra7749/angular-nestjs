import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './pages.component.html'
})
export class PagesComponent {
}
