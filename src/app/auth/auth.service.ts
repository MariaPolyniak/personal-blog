import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { filter, map, mapTo, tap } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { AuthTokenService } from "./auth-token.service";

import { User } from "../user-account/user.model";
import { SignUpRequest, SignInRequest, AuthResponse } from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly user = new BehaviorSubject(null);

  readonly user$ = this.user.pipe(filter(user => !!user));
  readonly isSignedIn$ = this.user.pipe(map(user => !!user));

  constructor(private http: HttpClient, private authTokenService: AuthTokenService) {}

  identify(): Observable<any> {
    return this.http.get<User>(`${environment.apiUrl}/users/current`).pipe(
      tap(user => this.user.next(user)),
      catchError(error => {
        this.signOut();
        return of(error);
      }),
      mapTo(undefined)
    );
  }

  signIn(formData: SignInRequest): Observable<any> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/sign-in`, formData).pipe(
      tap((res) => {
        this.user.next(res.user);
        this.authTokenService.setToken(res.token);
      })
    );
  }

  signUp(formData: SignUpRequest): Observable<any> {
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/sign-up`, form).pipe(
      tap((res) => {
        this.user.next(res.user);
        this.authTokenService.setToken(res.token);
      })
    );
  }

  signOut() {
    this.user.next(null);

    this.authTokenService.removeToken();
  }
}
