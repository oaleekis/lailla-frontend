import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { TokenInterceptor } from './auth/token.interceptor';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { matPaginatorIntlPtBr } from './shared/i18n/paginator-pt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => inject(TokenInterceptor).intercept(req, { handle: next })
      ])
    ),
    { provide: MatPaginatorIntl, useValue: matPaginatorIntlPtBr() }
  ],
};
