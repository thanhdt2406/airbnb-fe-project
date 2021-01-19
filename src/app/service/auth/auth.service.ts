import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
  import {User} from '../../model/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // update = new EventEmitter<string>();
  // @ts-ignore
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUserSubjectFromDB: BehaviorSubject<User>;
  // @ts-ignore
  private currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    // @ts-ignore
    this.currentUserSubjectFromDB = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  public get currentUserDBValue(): User {
    return this.currentUserSubjectFromDB.value;
  }

  public login(username: string, password: string) {
    return this.http.post<any>(API_URL + '/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        // this.update.emit('login');
        return user;
      }));
  }

  public login_gg(code: String) {
    // @ts-ignore
    return this.http.get<any>(API_URL + `/login-google?${code}`)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        // @ts-ignore
        this.currentUserSubject.next(user);
        // this.update.emit('login');
        return user;
      }));
  }

  // @ts-ignore
  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
    // @ts-ignore
    this.currentUserSubjectFromDB.next(null);
  }
}
