import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule, FormsModule, UserComponent],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})

export class UserSearchComponent {
  query: string = '';      // Nombre de usuario a buscar
  users: any[] = [];       // Lista de usuarios encontrados
  error: string = '';      // Mensaje de error si hay algún problema
  pageSize: number = 10;   // Tamaño de la página (usuarios por página)
  page: number = 1;        // Número de página actual

  constructor(private apiService: ApiService) {}

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
}
