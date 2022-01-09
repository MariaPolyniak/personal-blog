import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private TEST_USER_ID = '61cb9f64566f292154a28b87';
  private TEST_USER_USERNAME = 'test_user';

  getId() {
    return this.TEST_USER_ID;
  }

  getUsername() {
    return this.TEST_USER_USERNAME;
  }
}
