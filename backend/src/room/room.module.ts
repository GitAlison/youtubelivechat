import { Module } from '@nestjs/common';
import { RoomGateWay } from './room.gateway';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { MessageEntity } from './message.entity';
import { RoomController } from './room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, MessageEntity])],
  providers: [RoomGateWay, RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
