import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { HttpErrorInterceptor, HttpTokenInterceptor } from '@app/interceptors/http.interceptor';
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
      provideHttpClient(
        withInterceptors([HttpTokenInterceptor, HttpErrorInterceptor])
      ),
      importProvidersFrom([RouterModule.forRoot(routes)],
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule, BrowserAnimationsModule,
      ),
      { provide: 'STORAGE', useFactory: getStorage },
    ],
  }).catch(err => console.log(err));

export function getStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}
