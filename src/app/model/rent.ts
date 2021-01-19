import {User} from './user';
import {Apartment} from './apartment';

export interface Rent {
  id?: number;
  user?: User;
  apartment?: Apartment;
  endDate?: string;
  startDate?: string;
  createDate?: string;
}
