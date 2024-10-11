import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {}

  searchUsers(query: string, per_page: number = 10, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&per_page=${per_page}&page=${page}`;
    return this.http.get<any>(url);
  }
  

  fetchFollowers(users: any[]): Observable<any[]> {
    const requests: Observable<any>[] = users.map(user =>
      this.http.get(user.followers_url).pipe(
        map((data: any) => {
          return { ...user, followersCount: data.length };
        }),
        catchError(error => {
          console.error('Error fetching followers:', error);
          return of({ ...user, followersCount: 0 });
        })
      )
    );

    return forkJoin(requests);
  }
}
