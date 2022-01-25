import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public loginValid = true;

  public firstName = '';
  public lastName = '';
  public login = '';
  public password = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  public onSubmit(): void {
    this.loginValid = true;

    this.authService.signUp(this.firstName, this.lastName, this.login, this.password).pipe(
      take(1),
      tap(() => {
        this.loginValid = true;
      })
    ).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.loginValid = false
    });
  }

}
