import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Rating} from "../../model/rating";
import {Observable} from "rxjs";
import {Rent} from "../../model/rent";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {
  }

  addNewRating(rate: Rating): Observable<Rating> {
    return this.http.post<Rating>(API_URL + `/rating`, rate);
  }
}
