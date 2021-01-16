import {User} from './user';
import {Apartment} from './apartment';

export interface Comment {
  id?: number;
  content?: string;
  user?: User;
  apartment: Apartment;
}
