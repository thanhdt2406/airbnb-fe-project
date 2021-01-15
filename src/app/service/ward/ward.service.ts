import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Ward} from '../../model/ward';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class WardService {

  constructor(private http: HttpClient) { }

  getAllWard(): Observable<Ward[]> {
    return this.http.get<Ward[]>(API_URL + '/wards');
  }

  getWardById(id: number): Observable<Ward> {
    return this.http.get<Ward>(API_URL + `/wards/${id}`);
  }

  getAllWardByDistricts(id: number): Observable<Ward[]> {
    return this.http.get<Ward[]>(API_URL + `/wards/districts/${id}`);
  }
}
