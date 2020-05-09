import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
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

  @Get('web')
  web() {
    return this.appService.getWeb();
  }
}
