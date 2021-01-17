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

  saveRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(API_URL + `/rents`, rent);
  }

}
