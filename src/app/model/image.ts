import {Apartment} from './apartment';

export interface Image {
  id?: number;
  image?: string;
  apartment: Apartment;
}
