import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserComponent } from '../user/user.component';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

  constructor(private apiService: ApiService, private http: HttpClient) {}

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

    this.apiService.searchUsers(trimmedQuery).subscribe(
      (data) => {
        this.users = data.items;
        this.fetchFollowers(); // Fetch followers after user data is updated
      },
      (error) => {
        this.error = 'An error occurred while fetching users. Please try again.';
        this.users = [];
      }
    );
  }

  fetchFollowers(): void {
    const requests: Observable<any>[] = this.users.map(user =>
      this.http.get(user.followers_url).pipe(
        map((data: any) => {
          return { ...user, followersCount: data.length }; // Count of followers
        }),
        catchError(error => {
          console.error('Error fetching followers:', error);
          return of({ ...user, followersCount: 0 }); // Default to 0 on error
        })
      )
    );

    forkJoin(requests).subscribe(usersWithFollowers => {
      this.users = usersWithFollowers;
    });
  }
}
