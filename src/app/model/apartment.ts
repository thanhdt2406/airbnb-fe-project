import {User} from './user';
import {Ward} from './ward';

export interface Apartment {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  bathRoom?: string;
  bedRoom?: number;
  couple_room?: boolean;
  luxury_room?: boolean;
  president_room?: boolean;
  single_room?: boolean;
  vip_room?: boolean;
  create_date?: Date;
  status?: number;
  value?: number;
  description?: string;
  user?: User;
  ward?: Ward;
  /*---------------test-----------------*/
}
