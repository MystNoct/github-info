import { Component, Input, OnInit } from '@angular/core';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  @Input() users: any[] = [];

  constructor(private userSelectionService: UserSelectionService) {}

  onUserClick(user: any): void {
    this.userSelectionService.selectUser(user);
  }
}
