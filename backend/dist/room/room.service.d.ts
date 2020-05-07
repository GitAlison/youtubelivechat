import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class RoomService {
    private readonly roomRepository;
    private readonly messageRepository;
    private readonly userRepository;
    constructor(roomRepository: Repository<RoomEntity>, messageRepository: Repository<MessageEntity>, userRepository: Repository<UserEntity>);
    createRoom(video: string): Promise<any>;
    createMessage(data: any): Promise<any>;
    findAllMessages(): Promise<any[]>;
    findAll(): Promise<RoomEntity[]>;
}
