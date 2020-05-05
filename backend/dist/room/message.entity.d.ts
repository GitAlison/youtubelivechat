import { RoomEntity } from './room.entity';
export declare class MessageEntity {
    id: number;
    text: string;
    createdAt: Date;
    room: RoomEntity;
}
