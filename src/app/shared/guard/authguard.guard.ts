import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')) {
    return true;
  }
  return true;
};
