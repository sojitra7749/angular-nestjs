import { Routes } from '@angular/router';

import guestGuard from '@guards/guest.guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    canMatch: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('@app/pages/auth/login/login.component').then(m => m.LoginComponent),
      }
    ]
  }
];
