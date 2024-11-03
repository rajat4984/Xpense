import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const urlTree: UrlTree = router.parseUrl('/');
  if (localStorage.getItem('userId')) return true;
  else {
    return urlTree;
  }
};

export const loginGaurd: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const urlTree: UrlTree = router.parseUrl('/dashboard');

  if (!localStorage.getItem('userId')) return true;
  else return urlTree;
};
