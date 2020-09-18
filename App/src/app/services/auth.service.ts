import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  addUser(body): any{
    return this.http.post(environment.apiurl + '/register', body);
  }

  getlogin(body): any{
    return this.http.post(environment.apiurl + '/login', body);
  }

  loggedIn(): any{
    return !!localStorage.getItem('token');
  }

  gettoken(): any{
    return localStorage.getItem('token');
  }
}
