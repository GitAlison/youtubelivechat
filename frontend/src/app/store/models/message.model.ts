import { User } from 'src/app/auth/store/auth/user.model';

export interface Message {
  id: number;
  user?: User;
  text: string;
  created: Date;
}
