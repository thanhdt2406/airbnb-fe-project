import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apartment} from '../../model/apartment';
import {Rent} from '../../model/rent';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) {
  }

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
    // @ts-ignore
    return this.http.patch<Apartment>(API_URL + `/apartments/${id}`);
  }

  renting(id: number): Observable<Apartment> {
    // @ts-ignore
    return this.http.patch<Apartment>(API_URL + `/apartments/renting/${id}`);
  }

  repairRenting(id: number): Observable<Apartment> {
    // @ts-ignore
    return this.http.patch<Apartment>(API_URL + `/apartments/repair/${id}`);
  }

  rentAgain(id: number): Observable<Apartment> {
    // @ts-ignore
    return this.http.patch<Apartment>(API_URL + `/apartments/rentagain/${id}`);
  }

  getApartmentByUser(id: number): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(API_URL + `/apartments/user/${id}`)
  }

  rentApartment(id: number,startDate: Date, endDate: Date): Observable<Apartment> {
    // @ts-ignore
    return this.http.post<Apartment>(API_URL + `/rents/${id}`,startDate, endDate);
  }

  searchApartmentByCondition(province: string, districts: string, ward: string, bath: string, bed: string, checkin: string, checkout: string, vip: string, luxury: string, single: string, couple: string, president: string, minPrice: string, maxPrice: string): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(API_URL + `/apartments/searchs?province=${province}&district=${districts}&ward=${ward}&bath=${bath}&bed=${bed}&cr=${couple}&lr=${luxury}&pr=${president}&sr=${single}&vr=${vip}&checkin=${checkin}&checkout=${checkout}&minp=${minPrice}&maxp=${maxPrice}`)
  }



}
