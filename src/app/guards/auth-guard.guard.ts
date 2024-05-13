
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService} from '../services/authentication.service';



export const AuthGuardService: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isLoggedIn = inject(AuthenticationService).isLoggedIn();
  if (isLoggedIn) return true;

  inject(Router).navigate(['users/login']);
  return false;
};
