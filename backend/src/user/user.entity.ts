import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  AfterUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { Exclude } from 'class-transformer';

const bcrypt = require('bcrypt');

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @AfterUpdate()
  @BeforeInsert()
  private applybcript() {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
  }
}
