import { RoomService } from './room.service';
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    getMessages(video: any): Promise<any[]>;
    createMessage(body: any): Promise<any>;
}
