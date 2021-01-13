import {User} from './user';
import {Ward} from './ward';

export interface Apartment {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  bathRoom?: number;
  bedRoom?: number;
  couple_room?: number;
  luxury_room?: number;
  president_room?: number;
  single_room?: number;
  vip_room?: number;
  create_date?: Date;
  status?: number;
  value?: number;
  description?: string;
  user?: User;
  ward?: Ward;
  /*---------------test-----------------*/
}
