import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '@app/app.component';
import authGuard from '@guards/auth.guard';
import guestGuard from '@guards/guest.guard';
import { AuthInterceptor } from '@interceptors/auth.interceptor';


const appRoutes: Routes = [
  {
    path: '', redirectTo: '/auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent),
    canMatch: [guestGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./app/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canMatch: [authGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

bootstrapApplication(AppComponent,
  {
    providers: [
      importProvidersFrom([RouterModule.forRoot(appRoutes)],
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule, BrowserAnimationsModule,
      ),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: 'STORAGE', useFactory: getStorage },
    ],
  }).catch(err => console.log(err));

export function getStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}
