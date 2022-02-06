import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { mapTo } from "rxjs/operators";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.identify().pipe(mapTo(true));
  }
}
