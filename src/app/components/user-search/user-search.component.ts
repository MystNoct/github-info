import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserSelectionService } from '../../services/user-selection.service';
import { UserComponent } from '../user/user.component';
import { UserInfoModalComponent } from '../user-info-modal/user-info-modal.component';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [FormsModule, UserComponent, UserInfoModalComponent],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})

export class UserSearchComponent {
  query: string = '';
  users: any[] = [];      
  error: string = '';   
  pageSize: number = 10;
  page: number = 1;
  selectedUser: any = null;
  isModalOpen: boolean = false;

  constructor(private apiService: ApiService, private userSelectionService: UserSelectionService) {}

  ngOnInit(): void {
    this.userSelectionService.userSelected$.subscribe((user) => {
      this.openModal(user);
    });
  }

  searchUsers(): void {
    this.error = '';
    const trimmedQuery = this.query.trim();

    if (trimmedQuery.length < 4) {
      this.error = '*Username must be at least 4 characters long.';
      return;
    }

    if (trimmedQuery === "flowww") {
      this.error = '*flowww is not a valid username.';
      return;
    }

    this.page = 1;
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.searchUsers(this.query, this.pageSize, this.page).subscribe(
      (data) => {
        this.users = data.items;
        this.loadFollowers();
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.error = 'An error occurred while fetching users. Please try again.';
        this.users = [];
      }
    );
  }

  loadFollowers(): void {
    this.apiService.fetchFollowers(this.users).subscribe(
      (usersWithFollowers) => {
        this.users = usersWithFollowers;
      },
      (error) => {
        console.error('Error fetching followers:', error);
        this.error = 'An error occurred while fetching followers.';
      }
    );
  }

  nextPage(): void {
    this.page++;
    this.loadUsers();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  openModal(user: any): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectedUser = null;
    this.isModalOpen = false;
  }
}
