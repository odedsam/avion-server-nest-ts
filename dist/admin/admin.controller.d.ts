import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    private readonly logger;
    constructor(adminService: AdminService);
    removeNumberId(): Promise<{
        message: string;
        count?: number;
    }>;
}
