import { Controller, Get, Res, Param } from '@nestjs/common';
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

  @Get('trending')
  trands() {
    return this.appService.getWeb('https://www.youtube.com/feed/trending');
  }
  
  @Get('index')
  index() {
    return this.appService.getWeb('https://www.youtube.com');
  }

  @Get('search/:query')
  search(@Param('query') query) {
    console.log(query)
    return this.appService.getWeb('https://www.youtube.com/results?search_query='+query);
  }

}
