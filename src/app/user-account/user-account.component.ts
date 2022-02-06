import { Component } from '@angular/core';

import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  getAvatarUrl(avatarId): string {
    if(avatarId) {
      return `/images/${avatarId}`;
    } else {
      return '../../assets/avatar.png';
    }
  }
}
