import { Module } from '@nestjs/common';
import { RoomGateWay } from './room.gateway';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { MessageEntity } from './message.entity';
import { RoomController } from './room.controller';
import { UserEntity } from 'src/user/user.entity';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/auth/auth.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '99999s' },
    }),
    TypeOrmModule.forFeature([RoomEntity, MessageEntity, UserEntity]),
  ],
  providers: [RoomGateWay, RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
