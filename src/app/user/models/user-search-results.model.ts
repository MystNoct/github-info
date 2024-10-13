import { User } from './user.model';

export interface UserSearchResults {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}
