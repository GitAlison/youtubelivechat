import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
export declare class RoomService {
    private readonly roomRepository;
    private readonly messageRepository;
    constructor(roomRepository: Repository<RoomEntity>, messageRepository: Repository<MessageEntity>);
    createRoom(video: string): Promise<any>;
    createMessage(message: any): Promise<any>;
    findAllMessages(): Promise<any[]>;
    findAll(): Promise<RoomEntity[]>;
}
