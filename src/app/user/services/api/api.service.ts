import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Repository } from '../../models/repository.model';
import { User } from '../../models/user.model';
import { UserSearchResults } from '../../models/user-search-results.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchUsers(
    query: string,
    per_page: number = 10,
    page: number = 1
  ): Observable<UserSearchResults> {
    const url = `${this.apiUrl}/search/users?q=${query}&per_page=${per_page}&page=${page}`;
    return this.http.get<UserSearchResults>(url);
  }

  fetchFollowers(users: User[]): Observable<User[]> {
    const requests: Observable<User>[] = users.map((user) =>
      this.http.get(user.followers_url).pipe(
        map((data: any) => {
          return { ...user, followersCount: data.length };
        }),
        catchError((error) => {
          console.error('Error fetching followers:', error);
          return of({ ...user, followersCount: 0 });
        })
      )
    );

    return forkJoin(requests);
  }

  getUserDetails(username: string): Observable<User> {
    const url = `${this.apiUrl}/search/users/${username}`;
    return this.http.get<User>(url);
  }

  getUserRepos(username: string): Observable<Repository[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    return this.http.get<Repository[]>(url);
  }
}
