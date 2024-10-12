import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
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
