import {User} from './user';
import {Ward} from './ward';
import {District} from "./district";
import {Province} from "./province";
import {Image} from "./image";

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
  district?: District;
  province?: Province;
  image?: any[];
  avatar?: Image;
}
