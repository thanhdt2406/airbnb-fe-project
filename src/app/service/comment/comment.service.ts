import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apartment} from '../../model/apartment';
import {Comment} from '../../model/comment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createApartment(comment: Comment ): Observable<Comment> {
    return this.http.post<Comment>(API_URL + '/comments/apartments', comment);
  }

  getComment(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(API_URL + `/comments/apartment/${id}`);
  }

}
