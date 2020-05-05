import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    profile(req: any): Promise<any>;
    register(body: any): Promise<{
        access_token: string;
    }>;
}
