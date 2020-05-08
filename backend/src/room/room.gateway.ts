import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { UseInterceptors } from '@nestjs/common';
import { UserInterceptor } from 'src/auth/user.interceptor';

@WebSocketGateway()
export class RoomGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users = 0;
  constructor(private roomService: RoomService) {}

  async handleConnection(client) {
    this.users++;
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;
    this.server.emit('users', this.users);
  }

  @UseInterceptors(UserInterceptor)
  @SubscribeMessage('room')
  async onRoom(@ConnectedSocket() client, @MessageBody() data) {
    switch (data['type']) {
      case 'send_message':
        let messageCreated = await this.roomService.createMessage(data);
        client.broadcast.emit(`room${messageCreated.room}`, messageCreated);
        break;
      case 'open':
        await this.roomService.createRoom(data['message']);
        break;
      default:
        break;
    }
  }
}
