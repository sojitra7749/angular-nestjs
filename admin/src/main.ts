import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { AuthInterceptor } from '@interceptors/auth.interceptor';
import { appRoutes } from '@routes/app.routes';
import { authRoutes } from '@routes/auth.routes';


const routes: Routes = [
  ...authRoutes,
  ...appRoutes,
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

bootstrapApplication(AppComponent,
  {
    providers: [
      importProvidersFrom([RouterModule.forRoot(routes)],
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
