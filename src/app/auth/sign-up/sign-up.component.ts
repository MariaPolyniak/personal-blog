import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { take, tap } from "rxjs";

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public areDataValid = true;

  signUpForm = this.fb.group({
    firstName: [
      '', [ Validators.required, Validators.minLength(2), Validators.maxLength(10) ]
    ],
    lastName: [
      '', [ Validators.required, Validators.minLength(2), Validators.maxLength(10) ]
    ],
    login: [
      '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]
    ],
    password: [
      '', [ Validators.required, Validators.minLength(5), Validators.maxLength(15) ]
    ],
    avatar: [ null ]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public onFormSubmit(): void {
    this.areDataValid = true;

    this.authService.signUp(this.signUpForm.value).pipe(
      take(1),
      tap(() => this.areDataValid = true)
    ).subscribe({
      next: () => this.router.navigateByUrl('/home'),
      error: () => this.areDataValid = false
    })
  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files.length) {
      return;
    }

    this.signUpForm.get('avatar').setValue(fileInput.files[0]);
  }

  public onFileRemoved(fileInput: HTMLInputElement): void {
    fileInput.value = null;

    this.signUpForm.get('avatar').setValue(null);
  }
}
