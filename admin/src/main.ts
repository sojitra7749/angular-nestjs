import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';


const appRoutes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent),
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
      { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    ],
  }).catch(err => console.log(err));

  export function getLocalStorage() {
    return typeof window !== 'undefined' ? window.localStorage : null;
  }
