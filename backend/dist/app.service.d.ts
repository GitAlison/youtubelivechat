import { HttpService } from '@nestjs/common';
export declare class AppService {
    private readonly http;
    constructor(http: HttpService);
    getHello(): string;
    getWebHTMl(): Promise<any>;
    getWeb(): Promise<any[]>;
}
