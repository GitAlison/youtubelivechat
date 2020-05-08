export interface User {
  id?: number;
  username: string;
  password?: string;
}

export interface Token {
  access_token: string;
}
