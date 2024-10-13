import { Component } from '@angular/core';
import { UserSearchComponent } from './user/components/user-search/user-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Github Info';
}
