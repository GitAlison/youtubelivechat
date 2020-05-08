import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, RoomModule, TypeOrmModule.forRoot({}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}