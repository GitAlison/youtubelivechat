import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  AfterUpdate,
} from 'typeorm';
import { jwtConstants } from '../auth/auth.constants';
const bcrypt = require('bcrypt');

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;


  @Column()
  password: string;

  @Column({ default: Date() })
  createdAt: Date;

  @AfterUpdate()
  @BeforeInsert()
  private applybcript() {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
  }
}
