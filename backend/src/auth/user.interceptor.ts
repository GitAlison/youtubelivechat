import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    let contentSocket: any = context.switchToWs().getData();

    try {
      let jwt = contentSocket.headers.jwt;
      contentSocket.user = await this.getUser(jwt);
    } catch (error) {}

    return next.handle().pipe(map(data => data));
  }

  async getUser(Jwt) {
    if (this.jwtService.verify(Jwt)) {
      let user: any = this.jwtService.decode(Jwt);
      return await this.userRepository.findOne({ username: user.username });
    }
  }
}
