import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Token } from '../store/auth/user.model';

enum AuthRoutes {
  LOGIN = 'http://localhost:3000/auth/login',
  REGISTER = 'http://localhost:3000/auth/register',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(form: any) {
    return this.http.post<Token>(AuthRoutes.LOGIN, form);
  }

  register(form: any) {
    return this.http.post<Token>(AuthRoutes.REGISTER, form);
  }
}
