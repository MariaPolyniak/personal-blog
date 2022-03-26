import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSignedIn$ = this.authService.isSignedIn$;

  constructor(private authService: AuthService, public router: Router) {}

  public signIn(): void {
    this.router.navigateByUrl('/sign-in')
  }

  public signOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/sign-up')
  }
}
