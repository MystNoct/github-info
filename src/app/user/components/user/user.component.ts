import { Component, Input, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info/user-selection.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() users: any[] = [];

  constructor(private userInfoService: UserInfoService) {}

  onUserClick(user: any): void {
    this.userInfoService.saveUserInfo(user);
  }
}
