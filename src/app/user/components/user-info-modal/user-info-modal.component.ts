import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { User } from '../../models/user.model';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./user-info-modal.component.scss']
})
export class UserInfoModalComponent implements OnInit {
  @Input() user!: User; 
  @Output() close = new EventEmitter<void>();
  repos: Repository[] = [];
  loadingRepos: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getRepos();
  }

  getRepos(): void {
    this.loadingRepos = true;
    this.apiService.getUserRepos(this.user.login).subscribe(
      (repos) => {  
        this.repos = repos;
        this.loadingRepos = false;
      },
      (error) => {
        console.error('Error al cargar los repositorios:', error);
        this.loadingRepos = false;
      }
    );
  }

  closeModal(): void {
    this.close.emit();
  }
}
