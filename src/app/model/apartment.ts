import {User} from './user';
import {Ward} from './ward';
import {District} from "./district";
import {Province} from "./province";

export interface Apartment {
  id?: number;
  name?: string;
  address?: string;
  bathroom?: number;
  bedroom?: number;
  couple_room?: number;
  luxury_room?: number;
  president_room?: number;
  single_room?: number;
  vipRoom?: number;
  create_date?: Date;
  status?: number;
  value?: number;
  description?: string;
  user?: User;
  ward?: Ward;
  district?: District;
  province?: Province;
  image?: any[];
}
