import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {
  private userSelectedSource = new Subject<any>();
  userSelected$ = this.userSelectedSource.asObservable();

  selectUser(user: any): void {
    console.log('User selected:', user);
    this.userSelectedSource.next(user);
  }
}