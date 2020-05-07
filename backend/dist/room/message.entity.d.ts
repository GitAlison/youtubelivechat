import { BaseEntity } from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class MessageEntity extends BaseEntity {
    id: number;
    text: string;
    created: Date;
    updated: Date;
    room: RoomEntity;
    user: UserEntity;
}
