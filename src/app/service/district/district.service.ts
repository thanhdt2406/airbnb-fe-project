import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Ward} from '../../model/ward';
import {Image} from '../../model/image';
import {District} from '../../model/district';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http: HttpClient) { }

  getAllDistrict(): Observable<District[]> {
    return this.http.get<District[]>(API_URL + '/districts');
  }

  getDistrictById(id: number): Observable<District> {
    return this.http.get<District>(API_URL + `/districts/${id}`);
  }

  getDistrictByProvinceId(id: number): Observable<District[]> {
    return this.http.get<District[]>(API_URL + `/districts/province/${id}`);
  }
}
