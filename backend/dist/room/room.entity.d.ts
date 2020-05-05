import { MessageEntity } from './message.entity';
export declare class RoomEntity {
    id: number;
    video: string;
    createdAt: Date;
    messages: MessageEntity;
}
