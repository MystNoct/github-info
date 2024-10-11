import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {}

  // Método para buscar usuarios por nombre
  searchUsers(query: string, per_page: number = 10): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&per_page=${per_page}`;
    return this.http.get<any>(url);
  }
}
