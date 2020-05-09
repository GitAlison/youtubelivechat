import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Body,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Get()
  get(@Res() res: Response) {
    res.sendFile('index.html', {
      root: join(__dirname, '..', '..', 'frontend', 'www'),
    });
  }
}
