import {User} from './user';
import {Ward} from './ward';

export interface Apartment {
  id?: number;
  name?: string;
  address?: string;
  bathroom?: number;
  bedroom?: number;
  coupleRoom?: number;
  luxuryRoom?: number;
  presidentRoom?: number;
  singleRoom?: number;
  vipRoom?: number;
  create_date?: Date;
  status?: number;
  value?: number;
  description?: string;
  user?: User;
  ward?: Ward;
  image?: any[];
}
