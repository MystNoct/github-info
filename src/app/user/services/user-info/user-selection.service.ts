import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserInfoService {
  private userInfoSource = new Subject<User>();
  userInfo$ = this.userInfoSource.asObservable();

  saveUserInfo(user: User): void {
    this.userInfoSource.next(user);
  }
}
