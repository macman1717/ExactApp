import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/api.auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() == false) {
    router.navigate(['/exact/login']);
    return false;
  }

  return authService.isLoggedIn();
};
