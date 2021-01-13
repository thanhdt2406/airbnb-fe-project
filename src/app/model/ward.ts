import {District} from './district';

export interface Ward {
  id?: number;
  name?: string;
  type?: string;
  district?: District;
}
