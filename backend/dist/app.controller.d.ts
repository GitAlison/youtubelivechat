import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
export declare class AppController {
    private authService;
    private readonly appService;
    constructor(authService: AuthService, appService: AppService);
    get(res: Response): void;
    web(): Promise<any[]>;
}
