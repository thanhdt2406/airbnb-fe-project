import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rent} from '../../model/rent';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) {
  }

  getAllRented(id: number): Observable<Rent> {
    return this.http.get<Rent>(API_URL + `/rents/rented/${id}`);
  }

  saveRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(API_URL + `/rents`, rent);
  }

  cancelBooking(id1: number, id2: number): Observable<Rent> {
    return this.http.delete<Rent>(API_URL + `/rents/${id1}/${id2}`);
  }
  getAllBookingApartmentByUserId(id: number) : Observable<Rent[]> {
    return this.http.get<Rent[]>(API_URL + `/rents/user/${id}`);
  }
}
