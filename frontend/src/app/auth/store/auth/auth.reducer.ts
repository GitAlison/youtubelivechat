import { User, Token } from './user.model';
import { AuthAction, AuthActionTypes } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as jwtdecode from 'jwt-decode';

export interface AuthState {
  user: User;
  logged: boolean;
  token: Token;
}

const initialState: AuthState = {
  user: undefined,
  logged: false,
  token: {
    access_token: '',
  },
};

export function authReducer(
  state: AuthState = initialState,
  actions: AuthAction
) {
  switch (actions.type) {
    case AuthActionTypes.AUTHENTICATE_SUCCESS:
      let user = jwtdecode(actions.token.access_token);

      localStorage.setItem('tokenAccess', actions.token.access_token);
      return { ...state, user: user, token: actions.token, logged: true };
      
    case AuthActionTypes.AUTHENTICATE_LOGOUT:
      localStorage.removeItem('tokenAccess');
      return { ...state, user: undefined, token: '' };
    default:
      return state;
  }
}

const selectStateAuth = createFeatureSelector<AuthState>('auth');

export const getAuthState = createSelector(selectStateAuth, (state) => state);
