import { Controller, Get, Body, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getMessages() {
    return this.roomService.findAllMessages();
  }

  @Post()
  createMessage(@Body() body) {
    return this.roomService.createMessage(body);
  }
}
