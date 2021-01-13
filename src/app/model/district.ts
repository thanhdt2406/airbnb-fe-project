import {Province} from './province';

export interface District {
  id?: number;
  name?: string;
  type?: string;
  province?: Province;
}
