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

  getApartmentById(id: number): Observable<Apartment> {
    return this.http.get<Apartment>(API_URL + `/apartments/${id}`);
  }

  createApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(API_URL + '/apartments', apartment);
  }
  updateApartment(id: number, apartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(API_URL + `/apartments/${id}`, apartment);
  }

  editApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(API_URL + `/apartments/edit`, apartment);
  }
  stopRenting(id: number): Observable<Apartment> {
    return this.http.delete<Apartment>(API_URL + `/apartments/${id}`);
  }
}
