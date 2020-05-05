import { RoomService } from './room.service';
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    getMessages(): Promise<any[]>;
    createMessage(body: any): Promise<any>;
}
