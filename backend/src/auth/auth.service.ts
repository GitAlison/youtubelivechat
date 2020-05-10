import { Injectable, BadRequestException } from '@nestjs/common';

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
    try {
      const userAuth = await this.userRepository.findOne({
        where: { username },
      });
      bc.compare(pass, userAuth.password, function(err, result) {

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

    let userVerified = await this.userRepository.findOne({
      username: user.username,
    });

    if (userVerified) {
      throw new BadRequestException('Nome de Usuario já existe');
    }

    const newUser = await this.userRepository.create(payload).save();

    return this.login(newUser);
  }
}
