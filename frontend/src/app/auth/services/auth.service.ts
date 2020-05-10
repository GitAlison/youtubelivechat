import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Token } from '../store/auth/user.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  LOGIN = environment.base_api + 'auth/login';
  REGISTER = environment.base_api +'auth/register';

  constructor(private http: HttpClient) {}

  login(form: any) {
    return this.http.post<Token>(this.LOGIN, form);
  }

  register(form: any) {
    return this.http.post<Token>(this.REGISTER, form);
  }
}
