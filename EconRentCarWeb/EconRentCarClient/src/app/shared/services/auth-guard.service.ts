import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate() {
    if (!this.user.isLoggedIn()) {
       this.router.navigate(['/accounts/login'], {queryParams: {returnUrl: window.location.pathname}});
       return false;
    }

    return true;
  }
}
