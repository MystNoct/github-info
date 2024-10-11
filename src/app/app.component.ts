import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSearchComponent } from './components/user-search/user-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Github Info';
}
