import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  async register(@Body() body) {
    return this.authService.register(body);
  }
}
