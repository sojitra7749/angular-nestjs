import { Routes } from '@angular/router';

import authGuard from '@app/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('@pages/pages.component').then(m => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('@pages/admin/users/users.component').then(m => m.UsersComponent),
      }
    ]
  }
];
