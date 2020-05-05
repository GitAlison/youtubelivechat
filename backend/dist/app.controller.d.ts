import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    private readonly appService;
    constructor(authService: AuthService, appService: AppService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    profile(req: any): Promise<any>;
    register(body: any): Promise<{
        access_token: string;
    }>;
}
