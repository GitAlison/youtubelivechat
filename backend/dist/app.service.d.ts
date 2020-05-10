import { HttpService } from '@nestjs/common';
export declare class AppService {
    private readonly http;
    constructor(http: HttpService);
    getHello(): string;
    getWebHTMl(url: any): Promise<any>;
    getWeb(url: any): Promise<any[]>;
    getSugestionsVideo(video: any): Promise<void>;
}
