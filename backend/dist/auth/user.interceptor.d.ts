import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UserInterceptor implements NestInterceptor {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    getUser(Jwt: any): Promise<UserEntity>;
}
