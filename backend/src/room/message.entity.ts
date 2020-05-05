import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: Date() })
  createdAt: Date;

  @ManyToOne(type => RoomEntity, { nullable: true })
  @JoinColumn()
  room: RoomEntity;
}
