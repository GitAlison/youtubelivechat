import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly userRepository;
    constructor(usersService: UserService, jwtService: JwtService, userRepository: Repository<UserEntity>);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(user: any): Promise<{
        access_token: string;
    }>;
}
