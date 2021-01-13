import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apartment} from '../../model/apartment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) { }

  getSevenApartment(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(API_URL + `/apartments/seven`);
  }

  getAllApartment(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(API_URL + `/apartments`);
  }
}
