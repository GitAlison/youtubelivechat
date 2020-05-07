import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity('message')
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(
    type => RoomEntity,
    room => room.id,
    { cascade: true },
  )
  @JoinColumn()
  room: RoomEntity;

  @ManyToOne(
    type => UserEntity,
    user => user.id,
    { cascade: true },
  )
  @JoinColumn()
  user: UserEntity;
}
