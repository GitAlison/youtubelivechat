import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as bc from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(username);
    try {
      const userAuth = await this.userRepository.findOne({
        where: { username },
      });
      bc.compare(pass, userAuth.password, function(err, result) {
        console.log(result);
      });
      const user = await this.userRepository.findOne({
        where: { username },
      });
      return userAuth;
    } catch (error) {
      return null;
    }
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const payload = { username: user.username, password: user.password };
    const userPayload = await this.userRepository.create(payload);
    const userCreated = await this.userRepository.save(userPayload);
    return this.login(userCreated);
  }
}
