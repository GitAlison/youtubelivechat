import { BaseEntity } from 'typeorm';
import { MessageEntity } from './message.entity';
export declare class RoomEntity extends BaseEntity {
    id: number;
    video: string;
    created: Date;
    updated: Date;
    messages: MessageEntity;
}
