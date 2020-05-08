import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { RoomService } from './room.service';
export declare class RoomGateWay implements OnGatewayConnection, OnGatewayDisconnect {
    private roomService;
    server: any;
    rooms: Map<any, any>;
    users: number;
    constructor(roomService: RoomService);
    handleConnection(client: any): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
    onRoom(client: any, data: any): Promise<void>;
    updateChatUsers(video: any, type: any): any;
}
