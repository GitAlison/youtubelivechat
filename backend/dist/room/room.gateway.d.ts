import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { RoomService } from './room.service';
export declare class RoomGateWay implements OnGatewayConnection, OnGatewayDisconnect {
    private roomService;
    server: any;
    users: number;
    constructor(roomService: RoomService);
    handleConnection(client: any): Promise<void>;
    handleDisconnect(): Promise<void>;
    onRoom(client: any, message: any): Promise<void>;
}
