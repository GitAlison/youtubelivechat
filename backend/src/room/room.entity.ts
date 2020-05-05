import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  video: string;

  @Column({ default: Date() })
  createdAt: Date;

  @OneToMany(
    type => MessageEntity,
    message => message.room.id,
  )
  messages: MessageEntity;
}
