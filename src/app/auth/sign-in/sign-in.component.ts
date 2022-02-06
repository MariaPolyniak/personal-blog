import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";

import { take, tap } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public areDataValid = true;

  signInForm = this.fb.group({
    login: [
      '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]
    ],
    password: [
      '', [ Validators.required, Validators.minLength(5), Validators.maxLength(15) ]
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public onFormSubmit(): void {
    this.areDataValid = true;

    this.authService.signIn(this.signInForm.value).pipe(
      take(1),
      tap(() => this.areDataValid = true)
    ).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.areDataValid = false
    });
  }
}
