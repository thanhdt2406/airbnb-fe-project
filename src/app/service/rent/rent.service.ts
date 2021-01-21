import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rent} from '../../model/rent';
import {TotalIncome} from '../../model/total-income';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) {
  }

  getRentById(rentID: number): Observable<Rent> {
    return this.http.get<Rent>(API_URL + `rents/rent/${rentID}`);
  }

  getAllRented(useriId: number): Observable<Rent> {
    return this.http.get<Rent>(API_URL + `/rents/rented/${useriId}`);
  }

  saveRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(API_URL + `/rents`, rent);
  }

  cancelBooking(id1: number, id2: number): Observable<Rent> {
    return this.http.delete<Rent>(API_URL + `/rents/${id1}/${id2}`);
  }

  getAllBookingApartmentByUserId(id: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(API_URL + `/rents/user/${id}`);
  }
  getTotalIncomeByUserId(id: number,year:number,month:number) : Observable<number> {
    return this.http.get<number>(API_URL + `/rents/money/user/${id}/years/${year}/months/${month}`);
  }

  getAllRentedByApartment(id: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(API_URL + `/rents/list/${id}`)
  }
}
