import { Component } from '@angular/core';
import { map } from "rxjs/operators";

import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'login'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  user$ = this.authService.user$.pipe(map(user => [user]));

  constructor(private authService: AuthService) {}
}
