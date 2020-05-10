import {
  Controller,
  Get,
  Body,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get(':video')
  getMessages(@Param('video') video) {
    return this.roomService.findAllMessages(video);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(@Body() body) {
    return this.roomService.createMessage(body);
  }
}
