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
        console.log(messageCreated);
        client.broadcast.emit('room', messageCreated);
        break;

      case 'open':
        await this.roomService.createRoom(data['message']);

      default:
        break;
    }
    // let messages = await this.roomService.findAllMessages();
    // console.log(messages);
    // client.broadcast.emit('room', messages);
    // switch (message['type']) {
    //   case 'send_message':
    //     // console.log(message)
    //     // let messages = this.roomService.findAllMessages();
    //     // console.log(message)
    //     let messageCreated = await this.roomService.createMessage(
    //       message['message'],
    //     );
    //     client.broadcast.emit('newMessage', messageCreated);
    //     // client.broadcast.emit('room', message['message']);
    //     break;

    //   case 'open':
    //     // await this.roomService.createRoom(message['message']);
    //     // let rooms = await this.roomService.findAll();
    //     // console.log(rooms);

    //     // let messages = await this.roomService.findAllMessages();
    //     // console.log(messages);
    //     // client.broadcast.emit('room', messages);

    //     client.broadcast.emit('room', message['message']);
    //     break;

    //   default:
    //     break;
    // }
  }
}
