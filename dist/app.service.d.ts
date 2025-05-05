import { ConfigService } from '@nestjs/config';
type AppStatus = {
    status: string;
    version: string;
    enviroment: string;
};
export declare class AppService {
    private configService;
    constructor(configService: ConfigService);
    getHello(): string;
    getPort(): string;
    getStatus(): AppStatus;
}
export {};
