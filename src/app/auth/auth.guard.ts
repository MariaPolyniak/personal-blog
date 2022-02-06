import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';

import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isSignedIn$.pipe(
      map(isSignedIn => isSignedIn ? true : this.router.createUrlTree(['sign-in'])),
      take(1)
    );
  }
}
