import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest, LoginResponse} from '../model/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      "http://localhost:8080/api/v1/auth/login" ,credentials)
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
