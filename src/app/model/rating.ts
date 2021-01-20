import {User} from "./user";
import {Rent} from "./rent";

export interface Rating {
  id?: number;
  rent?: Rent;
  user?: User;
  star?: number;
  content?: string;
}
