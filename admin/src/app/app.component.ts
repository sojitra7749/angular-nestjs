import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '@components/toast/toast.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, ToastComponent]
})
export class AppComponent {
  title = 'admin';
}
