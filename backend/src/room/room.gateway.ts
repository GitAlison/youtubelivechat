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

  rooms = new Map();
  users = 0;

  constructor(private roomService: RoomService) {}
  async handleConnection(@ConnectedSocket() client) {
    const user = client.handshake.query.user;
    const video = client.handshake.query.video;

    let newUsers = this.updateChatUsers(video, 'add');
    console.log(newUsers);
    console.log(this.rooms);
    this.server.emit(`usersRoom${video}`, newUsers);
  }

  async handleDisconnect(@ConnectedSocket() client) {
    const video = client.handshake.query.video;

    let newUsers = this.updateChatUsers(video, 'remove');

    this.server.emit(`usersRoom${video}`, newUsers);
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
  updateChatUsers(video, type) {
    let roomUsers = this.rooms.get(video);
    if (type === 'add') {
      if (roomUsers >= 0) {
        let newCount = roomUsers + 1;
        this.rooms.set(video, newCount);
        return newCount;
      } else {
        this.rooms.set(video, 1);
        return 1;
      }
    } else {
      let newCount = roomUsers - 1;
      this.rooms.set(video, newCount);
      return newCount;
    }
  }
}
