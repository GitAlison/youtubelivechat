import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  getMessages() {
    return this.roomService.findAllMessages();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(@Body() body) {
    return this.roomService.createMessage(body);
  }
}
