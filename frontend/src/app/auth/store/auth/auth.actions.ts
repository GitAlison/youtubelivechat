import { Action } from '@ngrx/store';
import { Token } from './user.model';

export enum AuthActionTypes {
  AUTHENTICATE_SUCCESS = '[AUTH] Authenticate Success',
  AUTHENTICATE_LOGOUT = '[AUTH] Authenticate Logout',
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;
  constructor(public token: Token) {}
}

export class AuthenticateLogout implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_LOGOUT;
}

export type AuthAction = AuthenticateSuccess | AuthenticateLogout;
